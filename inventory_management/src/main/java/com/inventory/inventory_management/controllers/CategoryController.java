package com.inventory.inventory_management.controllers;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.inventory.inventory_management.dto.CategoryDTO;
import com.inventory.inventory_management.dto.CreateCategoryResponse;
import com.inventory.inventory_management.entities.ProductCategory;
import com.inventory.inventory_management.services.CategoryService;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
  private final CategoryService categoryService;

  public CategoryController(CategoryService categoryService){
    this.categoryService = categoryService;
  }

  @PostMapping
  ResponseEntity<CreateCategoryResponse> addProduct(@RequestBody ProductCategory cat){
    return categoryService.createCategory(cat);
  }

  @GetMapping
  List<CategoryDTO> getAllCategory(){
    return categoryService.getAllCategory();
  }

  @GetMapping("/{id}")
  public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Long id) {
      return categoryService.getCategoryById(id)
              .map(ResponseEntity::ok)
              .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<CreateCategoryResponse> updateCategory(@PathVariable Long id, @RequestBody ProductCategory category) {
      return categoryService.updateCategory(id, category);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
      categoryService.deleteCategory(id);
      return ResponseEntity.noContent().build();
  }
}