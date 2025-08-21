package com.inventory.inventory_management.controllers;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.inventory.inventory_management.dto.AllProduct;
import com.inventory.inventory_management.dto.ProductAddeResponse;
import com.inventory.inventory_management.entities.Product;
import com.inventory.inventory_management.services.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
  private ProductService productService;

  public ProductController(ProductService productService){
    this.productService = productService;
  }

  @PostMapping
  ResponseEntity<ProductAddeResponse> addProduct(@RequestBody Product product){
    System.out.println("I got "+ product.getName());
    return productService.addProduct(product);
  }

  @GetMapping
  public List<AllProduct> getAllProducts() {
    return productService.getAllProducts();
  }

  @GetMapping("/{productId}")
  public ResponseEntity<Product> getProductById(@PathVariable Long productId) {
    return productService.getProductById(productId)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping("/{productId}")
  public ResponseEntity<Product> updateProduct(@PathVariable Long productId, @RequestBody Product productDetails) {
    try {
      return ResponseEntity.ok(productService.updateProduct(productId, productDetails));
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{productId}")
  public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) {
    productService.deleteProduct(productId);
    return ResponseEntity.noContent().build();
  }
}