package com.inventory.inventory_management.dto;

import com.inventory.inventory_management.entities.User;

import lombok.Data;

@Data
public class LoginResponse {
    // private String message;
    private String message,name,email;
    private boolean status;
    
    // private String password;

    public LoginResponse(String message, User user,boolean status){
        this.message = message;
        this.name = user.getName();
        this.email = user.getEmail();
        this.status = status;
    }
}
