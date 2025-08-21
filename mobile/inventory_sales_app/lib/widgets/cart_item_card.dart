import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:inventory_sales_app/models/cart_item.dart';
import 'package:inventory_sales_app/controllers/cart_controller.dart';
import 'package:inventory_sales_app/utils/theme.dart';

class CartItemCard extends StatelessWidget {
  final CartItem cartItem;
  const CartItemCard({super.key, required this.cartItem});

  @override
  Widget build(BuildContext context) {
    final currency = NumberFormat.currency(symbol: 'KES ');
    final cart = Get.find<CartController>();
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Row(
          children: [
            Container(
              width: 64,
              height: 64,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: AppTheme.backgroundColor,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(Icons.inventory_2, color: AppTheme.primaryColor),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(cartItem.product.name, style: const TextStyle(fontWeight: FontWeight.w600)),
                  const SizedBox(height: 4),
                  Text(cartItem.product.category.name, style: AppTheme.body2),
                  const SizedBox(height: 8),
                  Text(currency.format(cartItem.product.priceList.price), style: const TextStyle(color: AppTheme.primaryColor, fontWeight: FontWeight.w700)),
                ],
              ),
            ),
            Row(
              children: [
                IconButton(
                  onPressed: cartItem.quantity > 1
                      ? () => cart.updateQuantity(cartItem.product.productId, cartItem.quantity - 1)
                      : null,
                  icon: const Icon(Icons.remove),
                ),
                Text('${cartItem.quantity}', style: const TextStyle(fontWeight: FontWeight.w600)),
                IconButton(
                  onPressed: cartItem.quantity < cartItem.product.stock.quantity
                      ? () => cart.updateQuantity(cartItem.product.productId, cartItem.quantity + 1)
                      : null,
                  icon: const Icon(Icons.add),
                ),
              ],
            ),
            IconButton(
              onPressed: () => cart.removeItem(cartItem.product.productId),
              icon: const Icon(Icons.delete_outline, color: AppTheme.errorColor),
            ),
          ],
        ),
      ),
    );
  }
}
