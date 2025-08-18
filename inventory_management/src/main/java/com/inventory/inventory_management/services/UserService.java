package com.inventory.inventory_management.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.inventory.inventory_management.entities.User;
import com.inventory.inventory_management.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    // private final SecurityConfig securityConfig;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

   public User creatUser(User user){
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    // final String encreptedPwd  = passwordEncoder.encode(user.getPassword());
    userRepository.save(user);
    return user;
   }
}
