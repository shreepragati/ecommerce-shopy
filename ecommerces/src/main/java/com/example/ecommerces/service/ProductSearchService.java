package com.example.ecommerces.service;

import com.example.ecommerces.model.Product;
import com.example.ecommerces.repository.elasticsearch.ElasticsearchProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductSearchService {

    private final ElasticsearchProductRepository elasticsearchProductRepository;

    public ProductSearchService(ElasticsearchProductRepository elasticsearchProductRepository) {
        this.elasticsearchProductRepository = elasticsearchProductRepository;
    }

    // Search by product name
    public List<Product> searchByName(String name) {
        return elasticsearchProductRepository.findByName(name);
    }

    // Search by name or description
    public Page<Product> searchByQuery(String query, int page, int size) {
        return elasticsearchProductRepository.searchWithPagination(query, PageRequest.of(page, size));
    }

    // Search by name/description and filter by category
    public Page<Product> searchByQueryAndCategory(String query, List<Long> categoryIds, int page, int size) {
        return elasticsearchProductRepository.findByNameAndCategoryIds(query, categoryIds, PageRequest.of(page, size));
    }

    // Filter by categories only
    public Page<Product> searchByCategoryIds(List<Long> categoryIds, int page, int size) {
        return elasticsearchProductRepository.findByCategoryIds(categoryIds, PageRequest.of(page, size));
    }

    // Search by price range
    public List<Product> searchByPriceRange(Double minPrice, Double maxPrice) {
        return elasticsearchProductRepository.findByMrpBetween(minPrice, maxPrice);
    }

    // Filter by category name
    public List<Product> searchByCategoryName(String categoryName) {
        return elasticsearchProductRepository.findByCategoryName(categoryName);
    }

    // Fetch all products with pagination
    public Page<Product> getAllProducts(int page, int size) {
        return elasticsearchProductRepository.findAll(PageRequest.of(page, size));
    }
}
