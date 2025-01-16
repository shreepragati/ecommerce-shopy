package com.example.ecommerces.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SpringConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(registry -> {
                    registry
                            .requestMatchers("/", "/login").permitAll()
                            .anyRequest().authenticated(); // Secure all other endpoints
                })
                .oauth2Login(oauth2 -> {
                    oauth2
                            .defaultSuccessUrl("http://localhost:5173/dashboard", true) // Redirect to dashboard after
                                                                                        // successful login
                            .failureUrl("http://localhost:5173/"); // Redirect to home on failure
                })
                .logout(logout -> {
                    logout
                            .logoutUrl("/logout") // Define the logout URL
                            .logoutSuccessUrl("http://localhost:5173/") // Redirect to home after logout
                            .invalidateHttpSession(true) // Invalidate session
                            .clearAuthentication(true); // Clear authentication details
                })
                .build();
    }
}
