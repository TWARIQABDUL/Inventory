package com.inventory.inventory_management.services;
import java.math.BigDecimal;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.inventory.inventory_management.dto.AllProduct;
import com.inventory.inventory_management.dto.ProductAddeResponse;
import com.inventory.inventory_management.dto.DefaultResponse;
import com.inventory.inventory_management.entities.Product;
import com.inventory.inventory_management.repository.ProductRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

  private final ProductRepository productRepository;

  public ProductService(ProductRepository productRepository){
    this.productRepository = productRepository;
  }

  public ResponseEntity<ProductAddeResponse> addProduct(Product product){
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

  public List<AllProduct> getAllProducts() {
    return productRepository.findAllWithStockAndPriceList()
    .stream().map(this::convertToAllProduct)
    .collect(Collectors.toList());
  }

  public Optional<AllProduct> getProductById(Long productId) {
    return productRepository.findById(productId)
    .map(this::convertToAllProduct);
  }

  public AllProduct updateProduct(Long productId, Product productDetails) {
    Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
    product.setName(productDetails.getName());
    product.setDescription(productDetails.getDescription());
    product.setTaxable(productDetails.getTaxable());
    product.setCategory(productDetails.getCategory());
    Product updatedProduct = productRepository.save(product);
    return convertToAllProduct(updatedProduct);
  }

  public ResponseEntity<?> deleteProduct(Long productId) {
    try {
    productRepository.deleteById(productId);
    return ResponseEntity.ok(
      new DefaultResponse("Product Deleted",true)
    );
      
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(
      new DefaultResponse("Product not Deleted",false)
    );
    }
  }

 private AllProduct convertToAllProduct(Product product) {
    int quantity = (product.getStock() != null) ? product.getStock().getQuantity() : 0;
    BigDecimal price = (product.getPriceList() != null) ? product.getPriceList().getPrice() : BigDecimal.ZERO;
    String categoryName = (product.getCategory() != null) ? product.getCategory().getName() : "Uncategorized";

    return new AllProduct(
        product.getProductId(),
        product.getName(),
        product.getDescription(),
        categoryName,
        product.getTaxable(),
        price,
        quantity
    );
}

}