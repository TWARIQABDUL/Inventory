package com.inventory.inventory_management.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class PriceListDto {
    private final Long priceListId;
    private final BigDecimal price;
}
