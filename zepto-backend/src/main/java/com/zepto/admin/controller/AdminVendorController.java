package com.zepto.admin.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zepto.admin.dto.RejectVendorRequest;
import com.zepto.admin.dto.VendorApprovalResponse;
import com.zepto.admin.dto.VendorSummaryResponse;
import com.zepto.admin.service.AdminVendorService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/admin/vendors")
@RequiredArgsConstructor
public class AdminVendorController {

    private final AdminVendorService adminVendorService;

    @GetMapping
    public ResponseEntity<List<VendorSummaryResponse>> getAllVendors() {
        return ResponseEntity.ok(adminVendorService.getAllVendors());
    }

    @GetMapping("/pending")
    public ResponseEntity<List<VendorSummaryResponse>> getPendingVendors() {
        return ResponseEntity.ok(adminVendorService.getPendingVendors());
    }

    @PutMapping("/{vendorId}/approve")
    public ResponseEntity<VendorApprovalResponse> approveVendor(
            @PathVariable Long vendorId) {

        return ResponseEntity.ok(
                adminVendorService.approveVendor(vendorId));
    }

    @PutMapping("/{vendorId}/reject")
    public ResponseEntity<VendorApprovalResponse> rejectVendor(
            @PathVariable Long vendorId,
            @Valid @RequestBody RejectVendorRequest request) {

        return ResponseEntity.ok(
                adminVendorService.rejectVendor(vendorId, request));
    }
}