package com.inventory.inventory_management.services;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.inventory.inventory_management.dto.ProductAddeResponse;
import com.inventory.inventory_management.entities.Product;
import com.inventory.inventory_management.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

  private final ProductRepository productRepository;

  public ProductService(ProductRepository productRepository){
    this.productRepository = productRepository;
  }

  public ResponseEntity<ProductAddeResponse> addProduct(Product product){
    System.out.println("Service recieved : "+product);
    try {
      productRepository.save(product);
      return ResponseEntity.ok(
        new ProductAddeResponse("Product Added Success full ",true,product.getProductId())
      );
    } catch (Exception e) {
      return ResponseEntity.ok(
        new ProductAddeResponse("Something went wrong ",false,product.getProductId())
      );
    }
  }

  public List<Product> getAllProducts() {
    return productRepository.findAll();
  }

  public Optional<Product> getProductById(Long productId) {
    return productRepository.findById(productId);
  }

  public Product updateProduct(Long productId, Product productDetails) {
    Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
    product.setName(productDetails.getName());
    product.setDescription(productDetails.getDescription());
    product.setTaxable(productDetails.getTaxable());
    product.setCategory(productDetails.getCategory());
    return productRepository.save(product);
  }

  public void deleteProduct(Long productId) {
    productRepository.deleteById(productId);
  }
}