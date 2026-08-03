package com.zepto.vendor.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zepto.vendor.dto.VendorRegisterRequest;
import com.zepto.vendor.dto.VendorResponse;
import com.zepto.vendor.service.VendorService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/vendor")
@RequiredArgsConstructor
@Validated
public class VendorController {

    private final VendorService vendorService;

    @PostMapping("/register")
    public ResponseEntity<VendorResponse> registerVendor(
            @Valid @RequestBody VendorRegisterRequest request) {

        VendorResponse response = vendorService.registerVendor(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }
}