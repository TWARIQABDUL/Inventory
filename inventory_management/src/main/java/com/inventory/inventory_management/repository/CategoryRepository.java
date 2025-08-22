package com.inventory.inventory_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.inventory_management.entities.ProductCategory;

public interface CategoryRepository extends JpaRepository<ProductCategory, Long> {
}