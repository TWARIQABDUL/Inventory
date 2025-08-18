package com.inventory.inventory_management.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.inventory_management.dto.LoginResponse;
import com.inventory.inventory_management.entities.User;
import com.inventory.inventory_management.services.LoginService;
import com.inventory.inventory_management.services.UserService;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;
    private final LoginService loginService;
    

    public UserController(UserService userService,LoginService loginService) {
        this.userService = userService;
        this.loginService = loginService;
    }

    @PostMapping("/register")
    public User creatUser(@RequestBody User user) {
        // return user;
        return userService.creatUser(user);
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody User user) {

        return loginService.login(user.getEmail(), user.getPassword());
    }
}

