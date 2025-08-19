package com.inventory.inventory_management.entities;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    private BigDecimal amount;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonBackReference("order-transactions")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "payment_mode_id")
    private PaymentMethod paymentMode;
}
