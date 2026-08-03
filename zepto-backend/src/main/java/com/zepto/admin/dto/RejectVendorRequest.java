package com.zepto.admin.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RejectVendorRequest {

    @NotBlank(message = "Rejection reason is required.")
    private String reason;

}