package com.inventory.inventory_management.services;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.inventory.inventory_management.dto.DefaultResponse;
import com.inventory.inventory_management.dto.LoginResponse;
import com.inventory.inventory_management.entities.User;
import com.inventory.inventory_management.repository.UserRepository;

@Service
public class LoginService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<?> login(String email, String pwd) {
        try {
            Optional<User> userEmail = userRepository.findByEmail(email);

            if (userEmail.isPresent()) {
                User user = userEmail.get();
                if (passwordEncoder.matches(pwd, user.getPassword())) {
                    return ResponseEntity.ok(
                            new LoginResponse("Login successful", user, true));
                }
            }

        } catch (Exception e) {
            return ResponseEntity.status(401).body(
                new DefaultResponse("Something Went Wrong",false)
            );

        }
        return ResponseEntity.status(401).body(new LoginResponse("User not found", null, false));

    }

}
