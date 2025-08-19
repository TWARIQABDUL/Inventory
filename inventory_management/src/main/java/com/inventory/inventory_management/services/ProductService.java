package com.inventory.inventory_management.services;
import com.inventory.inventory_management.entities.Product;
import com.inventory.inventory_management.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {
  private final ProductRepository productRepository;

  public ProductService(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  public List<Product> getAllProducts() {
    return productRepository.findAll();
  }

  public Product getProductById(Long id) {
    return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
  }

  public Product saveProduct(Product product) {
    return productRepository.save(product);
  }

  public Product updateProduct(Long id, Product updatedProduct) {
    Product existing = getProductById(id);
    existing.setProductName(updatedProduct.getProductName());
    existing.setProductCategory(updatedProduct.getProductCategory());
    existing.setQuantity(updatedProduct.getQuantity());
    existing.setPrice(updatedProduct.getPrice());
    existing.setIsStock(updatedProduct.getIsStock());
    return productRepository.save(existing);
  }

  public void deleteProduct(Long id) {
    productRepository.deleteById(id);
  }
}