package com.zepto.admin.dto;

import java.time.LocalDateTime;

import com.zepto.vendor.entity.BusinessType;
import com.zepto.vendor.entity.VendorStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendorSummaryResponse {

    private Long vendorId;

    private String shopName;

    private String ownerName;

    private String email;

    private String phone;

    private BusinessType businessType;

    private VendorStatus status;

    private LocalDateTime appliedAt;

}