package com.example.ecommerces.repository.elasticsearch;

import com.example.ecommerces.model.Product;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface ElasticsearchProductRepository extends ElasticsearchRepository<Product, Long> {

    // Find by exact product name
    List<Product> findByName(String name);

    // Search by name or description with full-text match
    @Query("""
            {
              "bool": {
                "should": [
                  { "match": { "name": "?0" } },
                  { "match": { "description": "?0" } }
                ]
              }
            }
            """)
    Page<Product> searchByNameOrDescription(String query, Pageable pageable);

    // Search by price range
    @Query("""
            {
              "range": {
                "mrp": {
                  "gte": ?0,
                  "lte": ?1
                }
              }
            }
            """)
    List<Product> findByMrpBetween(Double minPrice, Double maxPrice);

    // Find products by category name (for simple exact match search)
    List<Product> findByCategoryName(String categoryName);

    // Search by name or description with category filter
    @Query("""
            {
              "bool": {
                "must": [
                  {
                    "multi_match": {
                      "query": "?0",
                      "fields": ["name", "description"]
                    }
                  }
                ],
                "filter": [
                  {
                    "terms": {
                      "category.id": ?1
                    }
                  }
                ]
              }
            }
            """)
    Page<Product> findByNameAndCategoryIds(String query, List<Long> categoryIds, Pageable pageable);

    // Filter products by category IDs only (no search query)
    @Query("""
            {
              "bool": {
                "filter": [
                  {
                    "terms": {
                      "category.id": ?0
                    }
                  }
                ]
              }
            }
            """)
    Page<Product> findByCategoryIds(List<Long> categoryIds, Pageable pageable);

    // Search with pagination for query only (name and description)
    @Query("""
            {
              "bool": {
                "must": [
                  {
                    "multi_match": {
                      "query": "?0",
                      "fields": ["name", "description"]
                    }
                  }
                ]
              }
            }
            """)
    Page<Product> searchWithPagination(String query, Pageable pageable);

    // Fuzzy search by product name or description (partial match)
    @Query("""
            {
              "bool": {
                "should": [
                  { "match": { "name": { "query": "?0", "fuzziness": "AUTO" } } },
                  { "match": { "description": { "query": "?0", "fuzziness": "AUTO" } } }
                ]
              }
            }
            """)
    Page<Product> fuzzySearch(String query, Pageable pageable);
}
