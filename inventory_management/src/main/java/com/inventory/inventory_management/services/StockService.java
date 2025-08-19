package com.inventory.inventory_management.services;

import com.inventory.inventory_management.entities.Stock;
import com.inventory.inventory_management.entities.Product;
import com.inventory.inventory_management.repository.StockRepository;
import com.inventory.inventory_management.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Optional;

@Service
public class StockService {

    private final StockRepository stockRepository;
    private final ProductRepository productRepository;

    public StockService(StockRepository stockRepository, ProductRepository productRepository) {
        this.stockRepository = stockRepository;
        this.productRepository = productRepository;
    }

    public ResponseEntity<Object> createStock(Stock stock) {
        if (stock.getProduct() != null && stock.getProduct().getProductId() != null) {
            Optional<Product> existingProduct = productRepository.findById(stock.getProduct().getProductId());
            if (existingProduct.isPresent()) {
                stock.setProduct(existingProduct.get());
                Stock savedStock = stockRepository.save(stock);
                return ResponseEntity.ok(savedStock);
            } else {
                return ResponseEntity.badRequest().body("Product not found.");
            }
        }
        return ResponseEntity.badRequest().body("Product ID must be provided.");
    }

    public List<Stock> getAllStock() {
        return stockRepository.findAll();
    }

    public Optional<Stock> getStockById(Long id) {
        return stockRepository.findById(id);
    }

    public ResponseEntity<Object> updateStock(Long id, Stock updatedStock) {
        Optional<Stock> existingStock = stockRepository.findById(id);
        if (existingStock.isPresent()) {
            Stock stock = existingStock.get();
            stock.setQuantity(updatedStock.getQuantity());
            if (updatedStock.getProduct() != null && updatedStock.getProduct().getProductId() != null) {
                Optional<Product> existingProduct = productRepository.findById(updatedStock.getProduct().getProductId());
                if (existingProduct.isPresent()) {
                    stock.setProduct(existingProduct.get());
                } else {
                    return ResponseEntity.badRequest().body("Product not found for update.");
                }
            }
            Stock savedStock = stockRepository.save(stock);
            return ResponseEntity.ok(savedStock);
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<Void> deleteStock(Long id) {
        if (stockRepository.existsById(id)) {
            stockRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
