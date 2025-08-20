package com.inventory.inventory_management.dto;


import lombok.Data;


@Data
public class CreateStockDto {
    private Integer quantity;
    private String productName;

    public CreateStockDto(Integer quantity, String productName){
        this.productName = productName;
        this.quantity = quantity;
    }

}