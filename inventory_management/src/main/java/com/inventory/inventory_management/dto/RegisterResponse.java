package com.inventory.inventory_management.dto;

import com.inventory.inventory_management.entities.User;

import lombok.Data;

@Data
public class RegisterResponse {
    private String mesage,name,email;
    private Boolean status;

    public RegisterResponse(User user,String message,Boolean status){
        this.mesage = message;
        this.email = user.getEmail();
        this.name = user.getName();
        this.status = status;
    }
}
