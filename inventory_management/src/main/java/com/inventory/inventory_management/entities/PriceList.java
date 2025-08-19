package com.inventory.inventory_management.entities;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "price_list")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PriceList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long priceListId;

    private BigDecimal price;

    @OneToOne
    @JoinColumn(name = "product_id", unique = true)
    private Product product;
}
