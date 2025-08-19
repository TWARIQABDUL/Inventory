package com.inventory.inventory_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.inventory.inventory_management.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
