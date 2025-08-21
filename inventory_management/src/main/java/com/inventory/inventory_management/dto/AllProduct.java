package com.inventory.inventory_management.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AllProduct {
    private final Long productId;
    private final String productName,description, categoryName;
    private final boolean taxed;
    private final BigDecimal productCost;
    private final double inStock;
    // private final  double discount;

    // "productId": 2,
    //     "name": "Samsung",
    //     "description": "A detailed description of the example product.",
    //     "taxable": true,
}
