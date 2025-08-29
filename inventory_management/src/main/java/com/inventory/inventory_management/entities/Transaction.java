package com.inventory.inventory_management.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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

    private String transactionCode;

    private BigDecimal amount;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonBackReference("order-transactions")
    private Order order;

    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference("user-transactions")
    private User user;

    @ManyToOne
    @JoinColumn(name = "payment_mode_id")
    @JsonBackReference("paymentMode-transactions")
    private PaymentMethod paymentMode;
}