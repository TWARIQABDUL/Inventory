package com.inventory.inventory_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.inventory_management.entities.User;

public interface UserRepository extends JpaRepository <User,Integer> {}
