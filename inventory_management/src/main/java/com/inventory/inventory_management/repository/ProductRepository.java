package com.inventory.inventory_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.inventory.inventory_management.entities.Product;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.stock LEFT JOIN FETCH p.priceList LEFT JOIN FETCH p.category")
    List<Product> findAllWithStockAndPriceList();
}
