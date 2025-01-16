package com.example.ecommerces;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

@SpringBootTest
class EcommercesApplicationTests {

    @DynamicPropertySource
    static void setProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.elasticsearch.uris", () -> "http://localhost:9200");
        registry.add("spring.elasticsearch.username", () -> "elastic");
        registry.add("spring.elasticsearch.password", () -> "uPJDe84Vvrn3TAFvm-Xu"); // Replace with your actual password
    }

    @Test
    void contextLoads() {
        // Your test logic here
    }
}
