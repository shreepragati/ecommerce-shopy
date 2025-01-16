package com.example.ecommerces.controller;

import com.example.ecommerces.model.Product;
import com.example.ecommerces.service.ProductSearchService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductSearchController {

    private final ProductSearchService productSearchService;

    public ProductSearchController(ProductSearchService productSearchService) {
        this.productSearchService = productSearchService;
    }

    @GetMapping
    public ResponseEntity<?> searchProducts(
            @RequestParam(required = false, defaultValue = "") String q, // Search query
            @RequestParam(required = false) List<Long> categoryIds, // Category filter
            @RequestParam(defaultValue = "0") int page, // Pagination: Page number
            @RequestParam(defaultValue = "10") int size // Pagination: Page size
    ) {
        try {
            Page<Product> products;

            if (q != null && !q.trim().isEmpty() && categoryIds != null && !categoryIds.isEmpty()) {
                // Search by query and filter by categories
                products = productSearchService.searchByQueryAndCategory(q, categoryIds, page, size);
            } else if (q != null && !q.trim().isEmpty()) {
                // Search by query only
                products = productSearchService.searchByQuery(q, page, size);
            } else if (categoryIds != null && !categoryIds.isEmpty()) {
                // Filter by categories only
                products = productSearchService.searchByCategoryIds(categoryIds, page, size);
            } else {
                // Fetch all products with pagination
                products = productSearchService.getAllProducts(page, size);
            }

            return ResponseEntity.ok(products);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error occurred in elastic search : " + e.getMessage());
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<List<Product>> searchByName(@PathVariable String name) {
        try {
            List<Product> products = productSearchService.searchByName(name);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/price")
    public ResponseEntity<List<Product>> searchByPriceRange(
            @RequestParam Double minPrice,
            @RequestParam Double maxPrice) {
        try {
            List<Product> products = productSearchService.searchByPriceRange(minPrice, maxPrice);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/category")
    public ResponseEntity<List<Product>> searchByCategoryName(@RequestParam String categoryName) {
        try {
            List<Product> products = productSearchService.searchByCategoryName(categoryName);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}
