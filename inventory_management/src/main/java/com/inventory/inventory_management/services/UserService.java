package com.inventory.inventory_management.services;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.inventory.inventory_management.dto.RegisterResponse;
import com.inventory.inventory_management.entities.User;
import com.inventory.inventory_management.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    // private final SecurityConfig securityConfig;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

   public ResponseEntity<RegisterResponse> creatUser(User user){
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    // final String encreptedPwd  = passwordEncoder.encode(user.getPassword());
    try {
        System.out.println("ading user");
        userRepository.save(user);
        return ResponseEntity.ok(new RegisterResponse(user, "Registration successful", true));
    } catch (Exception e) {
        System.err.println("Error during user registration: " + e.getMessage());
        return ResponseEntity.badRequest().body(new RegisterResponse(user, "Registration failed: ", false));
    }
   }
}
