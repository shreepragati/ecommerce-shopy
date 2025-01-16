package com.example.ecommerces.controller;

import com.example.ecommerces.model.Product;
import com.example.ecommerces.repository.jpa.ProductRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * Get paginated products or products filtered by multiple category IDs.
     *
     * @param page        the page number (default is 0)
     * @param size        the number of items per page (default is 10)
     * @param categoryIds the list of category IDs (optional)
     * @return a paginated list of products wrapped in a ResponseEntity
     */
    @GetMapping
    public ResponseEntity<Page<Product>> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) List<Long> categoryIds) {
        Pageable pageable = PageRequest.of(page, size);

        try {
            Page<Product> products;

            if (categoryIds != null && !categoryIds.isEmpty()) {
                // Fetch products by multiple category IDs with pagination
                products = productRepository.findByCategoryIds(categoryIds, pageable);
            } else {
                // Fetch all products with pagination
                products = productRepository.findAll(pageable);
            }

            // If no products are found, return 204 No Content
            if (products.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            return ResponseEntity.ok(products); // Return paginated products
        } catch (Exception e) {
            // Log the error and return 500 Internal Server Error
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}
