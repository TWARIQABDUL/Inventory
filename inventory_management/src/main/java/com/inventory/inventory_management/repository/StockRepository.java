package com.inventory.inventory_management.repository;

import com.inventory.inventory_management.entities.Product;
import com.inventory.inventory_management.entities.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {
    Stock findByProduct(Product product);
}
