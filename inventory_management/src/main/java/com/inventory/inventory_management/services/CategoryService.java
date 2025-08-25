package com.inventory.inventory_management.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.inventory.inventory_management.dto.CategoryDTO;
import com.inventory.inventory_management.dto.CreateCategoryResponse;
import com.inventory.inventory_management.dto.DefaultResponse;
import com.inventory.inventory_management.entities.ProductCategory;
import com.inventory.inventory_management.repository.CategoryRepository;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public ResponseEntity<CreateCategoryResponse> createCategory(ProductCategory category) {
        try {
            categoryRepository.save(category);
            return ResponseEntity.ok(
                    new CreateCategoryResponse("category created", false));
        } catch (Exception e) {
            return ResponseEntity.ok(
                    new CreateCategoryResponse("something went wrong " + e, true));
        }
    }

    public List<CategoryDTO> getAllCategory(){
        return categoryRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<CategoryDTO> getCategoryById(Long id) {
        
        return categoryRepository.findById(id).map(this::convertToDto);
    }

    public ResponseEntity<CreateCategoryResponse> updateCategory(Long id, ProductCategory updatedCategory) {
        Optional<ProductCategory> existingCategory = categoryRepository.findById(id);
        if (existingCategory.isPresent()) {
            ProductCategory category = existingCategory.get();
            category.setName(updatedCategory.getName());
            categoryRepository.save(category);
            return ResponseEntity.ok(new CreateCategoryResponse("category updated", true));
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<?> deleteCategory(Long id) {
        try {
        categoryRepository.deleteById(id);
            return
            ResponseEntity.ok(
                new DefaultResponse("Category Deleted Succesfully",true)
            );
        } catch (Exception e) {
            return
            ResponseEntity.badRequest().body(
                new DefaultResponse("Category Not Successfull",false)
            );
        }
    }

    private CategoryDTO convertToDto(ProductCategory category) {
        return new CategoryDTO(category.getCategoryId(), category.getName());
    }
}