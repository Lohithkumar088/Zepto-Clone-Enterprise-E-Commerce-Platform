package com.zepto.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.zepto.user.entity.User;
import com.zepto.user.entity.UserRole;
import com.zepto.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private static final Logger log =
            LoggerFactory.getLogger(AdminInitializer.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        if (userRepository.existsByRole(UserRole.ADMIN)) {
            log.info("Admin account already exists. Skipping initialization.");
            return;
        }

        User admin = User.builder()
                .firstName("Admin")
                .lastName("User")
                .email("admin@zepto.com")
                .phone("9999999999")
                .password(passwordEncoder.encode("Admin@123"))
                .role(UserRole.ADMIN)
                .enabled(true)
                .build();

        userRepository.save(admin);

        log.info("Default admin account created successfully.");
    }
}