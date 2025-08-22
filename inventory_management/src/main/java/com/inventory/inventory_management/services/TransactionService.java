package com.inventory.inventory_management.services;

import com.inventory.inventory_management.dto.TransactionResponse;
import com.inventory.inventory_management.entities.Transaction;
import com.inventory.inventory_management.repository.TransactionRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

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

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Optional<Transaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }
}
