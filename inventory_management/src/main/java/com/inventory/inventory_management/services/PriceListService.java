package com.inventory.inventory_management.services;

import com.inventory.inventory_management.dto.PriceListDto;
import com.inventory.inventory_management.entities.PriceList;
import com.inventory.inventory_management.entities.Product;
import com.inventory.inventory_management.repository.PriceListRepository;
import com.inventory.inventory_management.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PriceListService {

    private final PriceListRepository priceListRepository;
    private final ProductRepository productRepository;

    public PriceListService(PriceListRepository priceListRepository, ProductRepository productRepository) {
        this.priceListRepository = priceListRepository;
        this.productRepository = productRepository;
    }

    public ResponseEntity<Object> createPriceList(PriceList priceList) {
        if (priceList.getProduct() != null && priceList.getProduct().getProductId() != null) {
            Optional<Product> existingProduct = productRepository.findById(priceList.getProduct().getProductId());
            if (existingProduct.isPresent()) {
                priceList.setProduct(existingProduct.get());
                PriceList savedPriceList = priceListRepository.save(priceList);
                return ResponseEntity.ok(savedPriceList);
            } else {
                return ResponseEntity.badRequest().body("Product not found.");
            }
        }
        return ResponseEntity.badRequest().body("Product ID must be provided.");
    }

    public List<PriceListDto> getAllPriceLists() {
        return priceListRepository.findAll()
                .stream()
                .map(this::convertToPriceListDto)
                .collect(Collectors.toList());
    }

    public Optional<PriceList> getPriceListById(Long id) {
        return priceListRepository.findById(id);
    }

    public ResponseEntity<Object> updatePriceList(Long id, PriceList updatedPriceList) {
        Optional<PriceList> existingPriceList = priceListRepository.findById(id);
        if (existingPriceList.isPresent()) {
            PriceList priceList = existingPriceList.get();
            priceList.setPrice(updatedPriceList.getPrice());
            if (updatedPriceList.getProduct() != null && updatedPriceList.getProduct().getProductId() != null) {
                Optional<Product> existingProduct = productRepository.findById(updatedPriceList.getProduct().getProductId());
                if (existingProduct.isPresent()) {
                    priceList.setProduct(existingProduct.get());
                } else {
                    return ResponseEntity.badRequest().body("Product not found for update.");
                }
            }
            PriceList savedPriceList = priceListRepository.save(priceList);
            return ResponseEntity.ok(savedPriceList);
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<Void> deletePriceList(Long id) {
        if (priceListRepository.existsById(id)) {
            priceListRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    private PriceListDto convertToPriceListDto(PriceList prices){
        return new PriceListDto(prices.getPriceListId(), prices.getPrice());
    }
}
