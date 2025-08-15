package com.inventory.inventory_management.entities;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import jakarta.persistence.Table;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String email;
    private String password;

    // Constructors
    public User() {}

    // public User() {}

    // // Getters & Setters
    // public Integer getId() { return id; }
    // public void setId(Integer id) { this.id = id; }

    // public String getName() { return name; }
    // public void setName(String name) { this.name = name; }

    // public String getEmail() { return email; }
    // public void setEmail(String email) { this.email = email; }

    // public String getPassword() { return password; }
    // public void setPassword(String password) { this.password = password; }
}


