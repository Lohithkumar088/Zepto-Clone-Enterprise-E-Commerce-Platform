package com.zepto.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth

                        // ==========================
                        // Public Endpoints
                        // ==========================
                        .requestMatchers(
                                "/api/v1/auth/**",
                                "/api/v1/vendor/register",

                                // Swagger
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**",
                                "/v3/api-docs",
                                "/swagger-resources/**",
                                "/swagger-resources",
                                "/webjars/**"
                        ).permitAll()

                        // ==========================
                        // Admin APIs
                        // ==========================
                        .requestMatchers("/api/v1/admin/**")
                        .hasRole("ADMIN")

                        // ==========================
                        // Vendor APIs
                        // ==========================
                        .requestMatchers("/api/v1/vendor/**")
                        .hasRole("VENDOR")

                        // ==========================
                        // User APIs
                        // ==========================
                        .requestMatchers("/api/v1/user/**")
                        .hasRole("USER")

                        // ==========================
                        // Everything Else
                        // ==========================
                        .anyRequest()
                        .authenticated())

                .addFilterBefore(jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}