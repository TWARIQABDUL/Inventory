package com.inventory.inventory_management.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class PriceResponseDto {

final String productName;
final Long productId;
final BigDecimal price;
final String message;

}
