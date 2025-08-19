package com.inventory.inventory_management.entities;

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
    @JoinColumn(name = "product_id", unique = true)
    private Product product;
}
