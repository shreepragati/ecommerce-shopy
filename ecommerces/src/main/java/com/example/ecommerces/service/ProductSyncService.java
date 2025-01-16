package com.example.ecommerces.service;

import com.example.ecommerces.model.Product;
import com.example.ecommerces.repository.jpa.ProductRepository;
import com.example.ecommerces.repository.elasticsearch.ProductElasticsearchRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ProductSyncService {

    private final ProductRepository productRepository;
    private final ProductElasticsearchRepository productElasticsearchRepository;

    public ProductSyncService(ProductRepository productRepository,
            ProductElasticsearchRepository productElasticsearchRepository) {
        this.productRepository = productRepository;
        this.productElasticsearchRepository = productElasticsearchRepository;
    }

    public void syncProducts() {
        List<Product> products = productRepository.findAll();
        productElasticsearchRepository.saveAll(products);
    }
}
