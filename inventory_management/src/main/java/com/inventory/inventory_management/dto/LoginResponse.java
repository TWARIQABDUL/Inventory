package com.inventory.inventory_management.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private String message;
    
    // private String password;

    public LoginResponse(String message){
        this.message = message;
    }
}
