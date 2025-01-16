package com.example.ecommerces;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.ecommerces.repository.jpa")
@EnableElasticsearchRepositories(basePackages = "com.example.ecommerces.repository.elasticsearch")
public class EcommercesApplication {
    public static void main(String[] args) {
        SpringApplication.run(EcommercesApplication.class, args);
    }
}
