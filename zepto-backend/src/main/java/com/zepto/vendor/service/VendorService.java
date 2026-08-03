package com.zepto.vendor.service;

import com.zepto.vendor.dto.VendorRegisterRequest;
import com.zepto.vendor.dto.VendorResponse;

public interface VendorService {

    VendorResponse registerVendor(VendorRegisterRequest request);

}