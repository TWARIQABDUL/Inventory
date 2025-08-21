package com.inventory.inventory_management.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "stock")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stockId;

    private Integer quantity;

    @OneToOne
    @JsonManagedReference("product-stock")
    @JoinColumn(name = "product_id", unique = true)
    private Product product;
}
