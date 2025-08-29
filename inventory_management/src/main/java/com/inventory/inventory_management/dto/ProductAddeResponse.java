package com.inventory.inventory_management.dto;

import lombok.Data;

@Data
public class ProductAddeResponse {
    
    private String message;
    private boolean status;
    private Long id;

    public ProductAddeResponse(String message, boolean status,Long id){
        this.message = message;
        this.status = status;
        this.id = id;

    }
}
