package com.inventory.inventory_management.services;

import com.inventory.inventory_management.dto.TransactionDTO;
import com.inventory.inventory_management.entities.Transaction;
import com.inventory.inventory_management.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AllTransaction {
    private final TransactionRepository transactionRepository;

    public AllTransaction(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<TransactionDTO> getAllTransactions() {
        List<Transaction> transactions = transactionRepository.findAll();
        return transactions.stream()
                .map(this::mapToTransactionDTO)
                .collect(Collectors.toList());
    }

    private TransactionDTO mapToTransactionDTO(Transaction transaction) {
        return TransactionDTO.builder()
                .transactionId(transaction.getTransactionId())
                .transactionCode(transaction.getTransactionCode())
                .amount(transaction.getAmount())
                .createdAt(transaction.getCreatedAt())
                .description(transaction.getDescription())
                .username(transaction.getUser().getUsername())
                .paymentMode(transaction.getPaymentMode().getName())
                .build();
    }
}
