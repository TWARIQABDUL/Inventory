package com.inventory.inventory_management.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "payment_modes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentModeId;

    private String name;

    @OneToMany(mappedBy = "paymentMode", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Transaction> transactions;
}
