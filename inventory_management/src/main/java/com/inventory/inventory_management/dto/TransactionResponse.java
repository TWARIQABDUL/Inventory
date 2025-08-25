package com.inventory.inventory_management.dto;

import lombok.Data;

@Data
public class TransactionResponse {
    private final String message,transaction_code;
    private final boolean status;
}
