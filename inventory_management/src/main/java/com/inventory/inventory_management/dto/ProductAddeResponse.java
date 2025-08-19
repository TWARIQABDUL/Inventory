package com.inventory.inventory_management.dto;

import lombok.Data;

@Data
public class ProductAddeResponse {
    
    private String message;
    private boolean status;

    public ProductAddeResponse(String message, boolean status){
        this.message = message;
        this.status = status;
    }
}
