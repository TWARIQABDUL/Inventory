package com.inventory.inventory_management.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.inventory.inventory_management.dto.CreateCategoryResponse;
import com.inventory.inventory_management.entities.ProductCategory;
import com.inventory.inventory_management.services.CategoryService;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
  private CategoryService categoryService;

  public CategoryController(CategoryService categoryService) {
    this.categoryService = categoryService;
  }

  @PostMapping
  ResponseEntity<CreateCategoryResponse> addProduct(@RequestBody ProductCategory cat) {
    return categoryService.createCategory(cat);
  }

  @GetMapping
  public java.util.List<ProductCategory> getAllCategories() {
    return categoryService.getAllCategories();
  }

  @GetMapping("/{id}")
  public ProductCategory getCategoryById(@PathVariable Long id) {
    return categoryService.getCategoryById(id);
  }
}