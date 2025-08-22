package com.inventory.inventory_management.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.inventory.inventory_management.dto.AllProduct;
import com.inventory.inventory_management.dto.DefaultResponse;
import com.inventory.inventory_management.dto.ProductAddeResponse;
import com.inventory.inventory_management.entities.Product;
import com.inventory.inventory_management.services.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
  private ProductService productService;

  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  @PostMapping
  ResponseEntity<ProductAddeResponse> addProduct(@RequestBody Product product) {
    // System.out.println("I got "+ product.getName());
    return productService.addProduct(product);
  }

  @GetMapping
  public List<AllProduct> getAllProducts() {
    return productService.getAllProducts();
  }

  @GetMapping("/{productId}")
  public ResponseEntity<?> getProductById(@PathVariable Long productId) {
    return productService.getProductById(productId)
        .<ResponseEntity<?>>map(ResponseEntity::ok)
        .orElse(ResponseEntity.status(404).body(
            new DefaultResponse("Product not Found", false)));
  }

  @PutMapping("/{productId}")
  public ResponseEntity<?> updateProduct(@PathVariable Long productId, @RequestBody Product productDetails) {
    try {
      return ResponseEntity.ok(productService.updateProduct(productId, productDetails));
    } catch (RuntimeException e) {
      return ResponseEntity.status(401).body(
          new DefaultResponse("Product with this id not found", false));
    }
  }

  @DeleteMapping("/{productId}")
  public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
    try {
      productService.deleteProduct(productId);
      return ResponseEntity.ok(
          new DefaultResponse("Product Deleted Successful", true));

    } catch (Exception e) {
      return ResponseEntity.status(404).body(
          new DefaultResponse("Failed to delete Product", false)
      );

    }
  }
}