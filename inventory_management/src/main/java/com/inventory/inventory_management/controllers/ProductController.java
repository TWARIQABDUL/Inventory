package com.inventory.inventory_management.controllers;
import com.inventory.inventory_management.entities.Product;
import com.inventory.inventory_management.services.ProductService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
  private final ProductService service;

  public ProductController(ProductService service) {
    this.service = service;
  }

  @GetMapping
  public List<Product> getAllProducts() {
    return service.getAllProducts();
  }

  @GetMapping("/{id}")
  public Product getProductById(@PathVariable Long id) {
    return service.getProductById(id);
  }

  @PostMapping
  public Product saveProduct(@RequestBody Product product) {
    return service.saveProduct(product);
  }

  @PutMapping("/{id}")
  public Product updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
    Product existing = getProductById(id);
    existing.setProductName(updatedProduct.getProductName());
    existing.setProductCategory(updatedProduct.getProductCategory());
    existing.setQuantity(updatedProduct.getQuantity());
    existing.setPrice(updatedProduct.getPrice());
    existing.setIsStock(updatedProduct.getIsStock());
    return service.saveProduct(existing);
  }

  @DeleteMapping("/{id}")
  public void deleteProduct(@PathVariable Long id) {
    service.deleteProduct(id);
  }
}