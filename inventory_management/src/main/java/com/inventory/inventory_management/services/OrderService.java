package com.inventory.inventory_management.services;

import com.inventory.inventory_management.dto.DefaultResponse;
import com.inventory.inventory_management.entities.Order;
import com.inventory.inventory_management.entities.OrderItem;
import com.inventory.inventory_management.entities.Product;
import com.inventory.inventory_management.entities.User;
// import com.inventory.inventory_management.entities.PaymentMethod;
// import com.inventory.inventory_management.entities.Transaction;
import com.inventory.inventory_management.repository.OrderRepository;
import com.inventory.inventory_management.repository.UserRepository;
import com.inventory.inventory_management.repository.ProductRepository;
// import com.inventory.inventory_management.repository.PaymentMethodRepository;

import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository,
            ProductRepository productRepository ) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        // this.paymentMethodRepository = paymentMethodRepository;
    }

    public ResponseEntity<Object> createOrder(Order order) {
        if (order.getUser() == null || order.getUser().getUserId() == null) {
            return ResponseEntity.badRequest().body("User ID must be provided.");
        }
        Optional<User> existingUser = userRepository.findById(order.getUser().getUserId());
        if (existingUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found.");
        }
        order.setUser(existingUser.get());

        order.setCreatedAt(LocalDateTime.now());
        order.setOrderCode(UUID.randomUUID().toString());

        if (order.getOrderItems() != null && !order.getOrderItems().isEmpty()) {
            for (OrderItem item : order.getOrderItems()) {
                if (item.getProduct() == null || item.getProduct().getProductId() == null) {
                    return ResponseEntity.badRequest().body("Product ID must be provided for order item.");
                }
                Optional<Product> existingProduct = productRepository.findById(item.getProduct().getProductId());
                if (existingProduct.isEmpty()) {
                    return ResponseEntity.badRequest().body("Product not found for order item.");
                }
                item.setProduct(existingProduct.get());
                item.setOrder(order);
            }
        } else {
            return ResponseEntity.badRequest().body("Order must contain at least one item.");
        }

        // Removed transaction validation block

        Order savedOrder = orderRepository.save(order);
        return ResponseEntity.ok(savedOrder);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public ResponseEntity<Object> updateOrder(Long id, Order updatedOrder) {
        Optional<Order> existingOrder = orderRepository.findById(id);
        if (existingOrder.isPresent()) {
            Order order = existingOrder.get();
            order.setTotalAmount(updatedOrder.getTotalAmount());
            order.setDiscount(updatedOrder.getDiscount());
            order.setActualAmount(updatedOrder.getActualAmount());
            order.setStatus(updatedOrder.getStatus());

            if (updatedOrder.getUser() != null && updatedOrder.getUser().getUserId() != null &&
                    !order.getUser().getUserId().equals(updatedOrder.getUser().getUserId())) {
                Optional<User> newUser = userRepository.findById(updatedOrder.getUser().getUserId());
                if (newUser.isEmpty()) {
                    return ResponseEntity.badRequest().body(
                            new DefaultResponse("New User Not Found", false));
                }
                order.setUser(newUser.get());
            }

            Order savedOrder = orderRepository.save(order);
            return ResponseEntity.ok(
                    new DefaultResponse("Record Updated" +savedOrder.getOrderCode(), false)

            );
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<Void> deleteOrder(Long id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
