package com.inventory.inventory_management.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.inventory.inventory_management.dto.CategoryDTO;
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

    public List<CategoryDTO> getAllCategory(){
        return categoyRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private CategoryDTO convertToDto(ProductCategory category) {
        return new CategoryDTO(category.getCategoryId(), category.getName());
    }
}
