package com.zepto.admin.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zepto.admin.dto.RejectVendorRequest;
import com.zepto.admin.dto.VendorApprovalResponse;
import com.zepto.admin.dto.VendorSummaryResponse;
import com.zepto.common.exception.ResourceNotFoundException;
import com.zepto.user.entity.User;
import com.zepto.user.entity.UserRole;
import com.zepto.user.repository.UserRepository;
import com.zepto.vendor.entity.Vendor;
import com.zepto.vendor.entity.VendorStatus;
import com.zepto.vendor.repository.VendorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminVendorServiceImpl implements AdminVendorService {

    private final VendorRepository vendorRepository;

    private final UserRepository userRepository;

    @Override
    public List<VendorSummaryResponse> getAllVendors() {

        return vendorRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<VendorSummaryResponse> getPendingVendors() {

        return vendorRepository.findByStatus(VendorStatus.PENDING)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private VendorSummaryResponse mapToResponse(Vendor vendor) {

        return VendorSummaryResponse.builder()
                .vendorId(vendor.getId())
                .shopName(vendor.getShopName())
                .ownerName(
                        vendor.getUser().getFirstName() + " "
                        + vendor.getUser().getLastName())
                .email(vendor.getUser().getEmail())
                .phone(vendor.getUser().getPhone())
                .businessType(vendor.getBusinessType())
                .status(vendor.getStatus())
                .appliedAt(vendor.getCreatedAt())
                .build();
    }

    @Override
    public VendorApprovalResponse approveVendor(Long vendorId) {

        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(()
                        -> new ResourceNotFoundException("Vendor not found."));

        if (vendor.getStatus() == VendorStatus.APPROVED) {
            return VendorApprovalResponse.builder()
                    .vendorId(vendor.getId())
                    .shopName(vendor.getShopName())
                    .status(vendor.getStatus().name())
                    .message("Vendor is already approved.")
                    .build();
        }

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        String adminEmail = authentication.getName();

        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(()
                        -> new ResourceNotFoundException("Admin not found."));

        User vendorUser = vendor.getUser();

        vendorUser.setRole(UserRole.VENDOR);

        vendor.setStatus(VendorStatus.APPROVED);
        vendor.setApprovedBy(admin);
        vendor.setApprovedAt(LocalDateTime.now());
        vendor.setRejectionReason(null);

        userRepository.save(vendorUser);
        vendorRepository.save(vendor);

        return VendorApprovalResponse.builder()
                .vendorId(vendor.getId())
                .shopName(vendor.getShopName())
                .status(vendor.getStatus().name())
                .message("Vendor approved successfully.")
                .build();
    }

    @Override
    public VendorApprovalResponse rejectVendor(Long vendorId,
            RejectVendorRequest request) {

        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(()
                        -> new ResourceNotFoundException("Vendor not found."));

        if (vendor.getStatus() == VendorStatus.REJECTED) {

            return VendorApprovalResponse.builder()
                    .vendorId(vendor.getId())
                    .shopName(vendor.getShopName())
                    .status(vendor.getStatus().name())
                    .message("Vendor is already rejected.")
                    .build();
        }

        vendor.setStatus(VendorStatus.REJECTED);
        vendor.setRejectionReason(request.getReason());
        vendor.setApprovedBy(null);
        vendor.setApprovedAt(null);

        vendorRepository.save(vendor);

        return VendorApprovalResponse.builder()
                .vendorId(vendor.getId())
                .shopName(vendor.getShopName())
                .status(vendor.getStatus().name())
                .message("Vendor rejected successfully.")
                .build();
    }
}
