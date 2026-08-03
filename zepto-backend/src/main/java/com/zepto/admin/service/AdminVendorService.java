package com.zepto.admin.service;

import java.util.List;

import com.zepto.admin.dto.RejectVendorRequest;
import com.zepto.admin.dto.VendorApprovalResponse;
import com.zepto.admin.dto.VendorSummaryResponse;

public interface AdminVendorService {

    List<VendorSummaryResponse> getAllVendors();

    List<VendorSummaryResponse> getPendingVendors();

    VendorApprovalResponse approveVendor(Long vendorId);

    VendorApprovalResponse rejectVendor(Long vendorId,
                                        RejectVendorRequest request);
}