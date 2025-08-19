package com.inventory.inventory_management.dto;

import lombok.Data;

@Data
public class CreateCategoryResponse {
 
    private String message;
    private boolean status;
    

    public CreateCategoryResponse(String message,boolean status){
        this.message = message;
        this.status = status;
    }
}
