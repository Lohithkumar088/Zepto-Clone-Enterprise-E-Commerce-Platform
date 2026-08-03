package com.zepto.vendor.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zepto.user.entity.User;
import com.zepto.vendor.entity.Vendor;
import com.zepto.vendor.entity.VendorStatus;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {

    boolean existsByUser(User user);

    boolean existsByGstNumber(String gstNumber);

    boolean existsByPanNumber(String panNumber);

    Optional<Vendor> findByUser(User user);

    long countByStatus(VendorStatus status);

    List<Vendor> findByStatus(VendorStatus status);

    Optional<Vendor> findById(Long id);

}
