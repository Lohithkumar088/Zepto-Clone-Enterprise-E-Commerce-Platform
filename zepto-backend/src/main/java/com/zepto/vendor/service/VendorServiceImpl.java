package com.zepto.vendor.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zepto.common.exception.ResourceAlreadyExistsException;
import com.zepto.user.entity.User;
import com.zepto.user.entity.UserRole;
import com.zepto.user.repository.UserRepository;
import com.zepto.vendor.dto.VendorRegisterRequest;
import com.zepto.vendor.dto.VendorResponse;
import com.zepto.vendor.entity.Vendor;
import com.zepto.vendor.entity.VendorStatus;
import com.zepto.vendor.repository.VendorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class VendorServiceImpl implements VendorService {

    private final VendorRepository vendorRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public VendorResponse registerVendor(VendorRegisterRequest request) {

        // Email validation
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResourceAlreadyExistsException(
                    "Email already registered.");
        }

        // Phone validation
        if (userRepository.existsByPhone(request.getPhone())) {
            throw new ResourceAlreadyExistsException(
                    "Phone number already registered.");
        }

        // GST validation
        if (vendorRepository.existsByGstNumber(request.getGstNumber())) {
            throw new ResourceAlreadyExistsException(
                    "GST number already exists.");
        }

        // PAN validation (optional)
        if (request.getPanNumber() != null
                && !request.getPanNumber().isBlank()
                && vendorRepository.existsByPanNumber(request.getPanNumber())) {

            throw new ResourceAlreadyExistsException(
                    "PAN number already exists.");
        }

        // Create User
        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.USER)
                .enabled(true)
                .build();

        userRepository.save(user);

        // Create Vendor
        Vendor vendor = Vendor.builder()
                .shopName(request.getShopName())
                .gstNumber(request.getGstNumber())
                .panNumber(request.getPanNumber())
                .businessType(request.getBusinessType())
                .status(VendorStatus.PENDING)
                .user(user)
                .build();

        vendorRepository.save(vendor);

        return new VendorResponse(
                "Vendor registration submitted successfully. Awaiting admin approval.");
    }
}