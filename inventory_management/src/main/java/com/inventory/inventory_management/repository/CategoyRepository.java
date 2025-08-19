package com.inventory.inventory_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.inventory_management.entities.ProductCategory;

public interface CategoyRepository extends JpaRepository<ProductCategory, Long> {
}

