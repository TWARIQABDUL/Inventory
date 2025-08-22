package com.inventory.inventory_management.services;

import com.inventory.inventory_management.dto.DefaultResponse;
import com.inventory.inventory_management.dto.PriceListDto;
import com.inventory.inventory_management.dto.PriceResponseDto;
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

    public ResponseEntity<?> createPriceList(PriceList priceList) {
        if (priceList.getProduct() != null && priceList.getProduct().getProductId() != null) {
            Optional<Product> existingProduct = productRepository.findById(priceList.getProduct().getProductId());
            if (existingProduct.isPresent()) {
                priceList.setProduct(existingProduct.get());
                PriceList savedPriceList = priceListRepository.save(priceList);
                return ResponseEntity.ok(
                        new PriceResponseDto(savedPriceList.getProduct().getName(),
                                savedPriceList.getProduct().getProductId(), savedPriceList.getPrice(),
                                "Product Added Success"));
            } else {
                return ResponseEntity.badRequest().body(
                        new DefaultResponse("Product Not Found", false)

                );
            }
        }
        return ResponseEntity.badRequest().body(
                new DefaultResponse("Product ID must be provided", false));
    }

    public List<PriceListDto> getAllPriceLists() {
        return priceListRepository.findAll()
                .stream()
                .map(this::convertToPriceListDto)
                .collect(Collectors.toList());
    }

    public Optional<PriceListDto> getPriceListById(Long id) {
        return priceListRepository.findById(id)
                .map(this::convertToPriceListDto);
                // .collect(Collectors.toList());
    }

    public ResponseEntity<Object> updatePriceList(Long id, PriceList updatedPriceList) {
        Optional<PriceList> existingPriceList = priceListRepository.findById(id);
        if (existingPriceList.isPresent()) {
            PriceList priceList = existingPriceList.get();
            priceList.setPrice(updatedPriceList.getPrice());
            if (updatedPriceList.getProduct() != null && updatedPriceList.getProduct().getProductId() != null) {
                Optional<Product> existingProduct = productRepository
                        .findById(updatedPriceList.getProduct().getProductId());
                if (existingProduct.isPresent()) {
                    priceList.setProduct(existingProduct.get());
                } else {
                    return ResponseEntity.badRequest().body("Product not found for update.");
                }
            }
            PriceList savedPriceList = priceListRepository.save(priceList);
            return ResponseEntity.ok(savedPriceList);
        }
        return ResponseEntity.badRequest().body(
            new DefaultResponse("Some thing went wron", false)
        );
    }

    public ResponseEntity<?> deletePriceList(Long id) {
        if (priceListRepository.existsById(id)) {
            priceListRepository.deleteById(id);

            return ResponseEntity.status(200).body(
            new DefaultResponse("Price List deleted", true)
                
            );
        }
        return ResponseEntity.status(404).body(
            new DefaultResponse("Id Not Found", false)
        );
    }

    private PriceListDto convertToPriceListDto(PriceList prices) {
        return new PriceListDto(prices.getPriceListId(), prices.getPrice());
    }
}
