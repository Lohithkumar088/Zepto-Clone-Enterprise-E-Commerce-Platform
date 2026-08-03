package com.zepto.vendor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zepto.vendor.entity.Vendor;


public interface VendorRepository extends JpaRepository<Vendor, Long> {

}