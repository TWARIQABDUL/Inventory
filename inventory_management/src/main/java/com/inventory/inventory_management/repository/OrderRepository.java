package com.inventory.inventory_management.repository;

import com.inventory.inventory_management.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT q FROM stock p LEFT JOIN FETCH p.stock LEFT JOIN FETCH p.priceList LEFT JOIN FETCH p.category")
    void updateQuantity();

}
