package com.inventory.inventory_management.entities;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal costPrice;
    private BigDecimal discount;
    private BigDecimal actualAmount;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonBackReference("order-orderItems")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonBackReference("product-orderItems")
    private Product product;
}
