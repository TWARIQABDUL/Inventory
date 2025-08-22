import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:inventory_sales_app/controllers/cart_controller.dart';
import 'package:inventory_sales_app/widgets/cart_item_card.dart';
import 'package:inventory_sales_app/utils/theme.dart';

class CartScreen extends StatelessWidget {
  const CartScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final cart = Get.isRegistered<CartController>()
        ? Get.find<CartController>()
        : Get.put(CartController(), permanent: true);
    final currency = NumberFormat.currency(symbol: 'KES ');
    return Scaffold(
      appBar: AppBar(
        title: const Text('Shopping Cart'),
        actions: [
          Obx(() => cart.isEmpty
              ? const SizedBox.shrink()
              : TextButton(
                  onPressed: () => Get.dialog(AlertDialog(
                        title: const Text('Clear Cart'),
                        content: const Text('Are you sure you want to clear your cart?'),
                        actions: [
                          TextButton(onPressed: Get.back, child: const Text('Cancel')),
                          TextButton(
                              onPressed: () {
                                cart.clear();
                                Get.back();
                                Get.snackbar('Cleared', 'Cart cleared', snackPosition: SnackPosition.BOTTOM, backgroundColor: AppTheme.successColor, colorText: Colors.white);
                              },
                              child: const Text('Clear', style: TextStyle(color: AppTheme.errorColor)))
                        ],
                      )),
                  child: const Text('Clear', style: TextStyle(color: AppTheme.errorColor))))
        ],
      ),
      body: Obx(() {
        if (cart.isEmpty) {
          return const Center(child: Text('Your cart is empty'));
        }
        return Column(
          children: [
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.all(16),
                itemCount: cart.items.length,
                itemBuilder: (_, i) => CartItemCard(cartItem: cart.items[i]),
              ),
            ),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: const BoxDecoration(color: Colors.white, boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 8, offset: Offset(0, -2))]),
              child: Column(
                children: [
                  Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                    const Text('Subtotal:', style: AppTheme.body1),
                    Text(currency.format(cart.totalAmount), style: const TextStyle(color: AppTheme.primaryColor, fontWeight: FontWeight.w700))
                  ]),
                  const SizedBox(height: 12),
                  ElevatedButton.icon(
                    onPressed: () => Get.dialog(AlertDialog(
                      title: const Text('Checkout'),
                      content: Text('Total: ${currency.format(cart.totalAmount)}'),
                      actions: [TextButton(onPressed: Get.back, child: const Text('OK'))],
                    )),
                    icon: const Icon(Icons.payment),
                    label: const Text('Checkout with M-Pesa'),
                    style: ElevatedButton.styleFrom(backgroundColor: AppTheme.secondaryColor),
                  )
                ],
              ),
            )
          ],
        );
      }),
    );
  }
}
