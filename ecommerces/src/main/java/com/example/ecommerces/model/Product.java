package com.example.ecommerces.model;

import jakarta.persistence.*;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.math.BigDecimal;

@Entity
@Document(indexName = "products") // Define the Elasticsearch index name
public class Product {

    @jakarta.persistence.Id // JPA ID
    @org.springframework.data.annotation.Id // Elasticsearch ID
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Field(type = FieldType.Text)
    private String name;

    @Field(type = FieldType.Integer)
    private Integer quantity;

    @Field(type = FieldType.Double)
    private BigDecimal mrp;

    @Field(type = FieldType.Double)
    private BigDecimal discountPrice;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Field(type = FieldType.Keyword) // Add for Elasticsearch
    private String categoryName;

    // Default constructor
    public Product() {
    }

    // Constructor with parameters
    public Product(String name, Integer quantity, BigDecimal mrp, BigDecimal discountPrice, Category category) {
        this.name = name;
        this.quantity = quantity;
        this.mrp = mrp;
        this.discountPrice = discountPrice;
        this.category = category;
        this.categoryName = category.getName(); // Populate categoryName
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getMrp() {
        return mrp;
    }

    public void setMrp(BigDecimal mrp) {
        this.mrp = mrp;
    }

    public BigDecimal getDiscountPrice() {
        return discountPrice;
    }

    public void setDiscountPrice(BigDecimal discountPrice) {
        this.discountPrice = discountPrice;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
        this.categoryName = category.getName(); // Ensure categoryName is updated
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    // toString method
    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", quantity=" + quantity +
                ", mrp=" + mrp +
                ", discountPrice=" + discountPrice +
                ", category=" + category +
                ", categoryName='" + categoryName + '\'' +
                '}';
    }
}
