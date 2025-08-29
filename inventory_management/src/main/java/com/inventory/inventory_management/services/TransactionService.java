package com.inventory.inventory_management.services;

import com.inventory.inventory_management.dto.DefaultResponse;
import com.inventory.inventory_management.dto.TransactionDTO;
import com.inventory.inventory_management.dto.TransactionResponse;
import com.inventory.inventory_management.entities.Transaction;
import com.inventory.inventory_management.repository.TransactionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public ResponseEntity<?> createTransaction(Transaction transaction) {
        try {
        transactionRepository.save(transaction);
        return ResponseEntity.ok(
            new TransactionResponse("TransactionSuccessfull",transaction.getTransactionCode(),true)
        );

            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                new TransactionResponse("Transaction Failed",transaction.getTransactionCode(),false)
            );
        }
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
                .username(transaction.getUser() != null ? transaction.getUser().getUsername() : null)
                .paymentMode(transaction.getPaymentMode() != null ? transaction.getPaymentMode().getName() : null)
                .build();
    }

    public Optional<Transaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }

    public ResponseEntity<?> deleteTransaction(Long id) {

        try {
        transactionRepository.deleteById(id);
        return ResponseEntity.ok(
            new DefaultResponse("Transaction deleted", true)
        );
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
            new DefaultResponse("Transaction Not deleted", false)
        );
        }
    }
}
