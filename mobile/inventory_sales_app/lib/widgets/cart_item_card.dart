import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:inventory_sales_app/models/cart_item.dart';
import 'package:inventory_sales_app/controllers/cart_controller.dart';
import 'package:inventory_sales_app/utils/theme.dart';

class CartItemCard extends StatelessWidget {
  final CartItem item;
  
  const CartItemCard({super.key, required this.item});

  @override
  Widget build(BuildContext context) {
    final cart = Get.find<CartController>();
    final currency = NumberFormat.currency(symbol: 'KES ');

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Row(
          children: [
            // Product Image
            Container(
              width: 60,
              height: 60,
              decoration: BoxDecoration(
                color: AppTheme.backgroundColor,
                borderRadius: BorderRadius.circular(8),
              ),
              child:
                  const Icon(Icons.inventory_2, color: AppTheme.primaryColor),
            ),
            const SizedBox(width: 12),
            
            // Product Details
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(cartItem.product.productName,
                      style: const TextStyle(fontWeight: FontWeight.w600)),
                  const SizedBox(height: 4),
                  Text(cartItem.product.categoryName, style: AppTheme.body2),
                  const SizedBox(height: 8),
                  Text(currency.format(cartItem.product.productCost),
                      style: const TextStyle(
                          color: AppTheme.primaryColor,
                          fontWeight: FontWeight.w700)),
                ],
              ),
            ),
            Row(
              children: [
                IconButton(
                  onPressed: cartItem.quantity > 1
                      ? () => cart.updateQuantity(
                          cartItem.product.productId, cartItem.inStoc - 1)
                      : null,
                  icon: const Icon(Icons.remove),
                ),
                Text('${cartItem.quantity}',
                    style: const TextStyle(fontWeight: FontWeight.w600)),
                IconButton(
                  onPressed: cartItem.quantity < cartItem.product.inStock
                      ? () => cart.updateQuantity(
                          cartItem.product.productId, cartItem.quantity + 1)
                      : null,
                  icon: const Icon(Icons.add),
                ),
              ],
            ),
            
            // Remove Button
            IconButton(
              onPressed: () => cart.removeItem(cartItem.product.productId),
              icon:
                  const Icon(Icons.delete_outline, color: AppTheme.errorColor),
            ),
          ],
        ),
      ),
    );
  }
}
