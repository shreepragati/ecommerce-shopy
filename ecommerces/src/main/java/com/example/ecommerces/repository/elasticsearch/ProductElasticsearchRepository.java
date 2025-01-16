package com.example.ecommerces.repository.elasticsearch;

import com.example.ecommerces.model.Product;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface ProductElasticsearchRepository extends ElasticsearchRepository<Product, Long> {

    // Search by product name
    List<Product> findByName(String name);

    // Search by category name
    List<Product> findByCategoryName(String categoryName);

    // Search by price range
    List<Product> findByMrpBetween(Double minPrice, Double maxPrice);

    // Custom query: search by name or description
    @org.springframework.data.elasticsearch.annotations.Query("""
            {
              "bool": {
                "should": [
                  { "match": { "name": "?0" } },
                  { "match": { "description": "?0" } }
                ]
              }
            }
            """)
    List<Product> searchByNameOrDescription(String query);

    // Custom query with pagination
    @org.springframework.data.elasticsearch.annotations.Query("""
            {
              "multi_match": {
                "query": "?0",
                "fields": ["name", "description"]
              }
            }
            """)
    Page<Product> searchWithPagination(String query, Pageable pageable);

    // Search by category ID
    @org.springframework.data.elasticsearch.annotations.Query("""
            {
              "term": {
                "category.id": "?0"
              }
            }
            """)
    List<Product> findByCategoryId(Long categoryId);
}
