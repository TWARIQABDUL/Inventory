package com.inventory.inventory_management.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDTO {
    private Long transactionId;
    private String transactionCode;
    private BigDecimal amount;
    private LocalDateTime createdAt;
    private String description;
    private String username;
    private String paymentMode;
}
