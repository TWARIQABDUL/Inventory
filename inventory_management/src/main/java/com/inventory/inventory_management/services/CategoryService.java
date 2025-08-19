package com.inventory.inventory_management.services;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.inventory.inventory_management.dto.CreateCategoryResponse;
import com.inventory.inventory_management.entities.ProductCategory;
import com.inventory.inventory_management.repository.CategoyRepository;

@Service
public class CategoryService {

    private CategoyRepository categoyRepository;

    public CategoryService(CategoyRepository categoyRepository) {
        this.categoyRepository = categoyRepository;

    }

    public ResponseEntity<CreateCategoryResponse> createCategory(ProductCategory category) {
        try {
            categoyRepository.save(category);
            return ResponseEntity.ok(
                    new CreateCategoryResponse("catefory created", false));
        } catch (Exception e) {
            return ResponseEntity.ok(
                    new CreateCategoryResponse("something went wrong " + e, false));
        }
    }
}
