package com.inventory.inventory_management.entities;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id") 
    private User user; 

    @OneToMany(mappedBy = "order")
    private List<OrderItem> orderItems;

    private double totalAmount,discount,actualAmount;
    
    private String createdAt;
    
    private Enum status;
    
}
