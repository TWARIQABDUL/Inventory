import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:inventory_sales_app/models/product.dart';
import 'package:inventory_sales_app/controllers/cart_controller.dart';
import 'package:inventory_sales_app/utils/theme.dart';

class ProductDetailScreen extends StatefulWidget {
  const ProductDetailScreen({super.key});

  @override
  State<ProductDetailScreen> createState() => _ProductDetailScreenState();
}

class _ProductDetailScreenState extends State<ProductDetailScreen> {
  int qty = 1;
  final cart = Get.isRegistered<CartController>()
      ? Get.find<CartController>()
      : Get.put(CartController(), permanent: true);

  @override
  Widget build(BuildContext context) {
    final product = Get.arguments as Product;
    final currency = NumberFormat.currency(symbol: 'KES ');

    return Scaffold(
      appBar: AppBar(title: const Text('Product Details')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              height: 220,
              alignment: Alignment.center,
              decoration: BoxDecoration(color: AppTheme.backgroundColor, borderRadius: BorderRadius.circular(12)),
              child: const Icon(Icons.inventory_2, color: AppTheme.primaryColor, size: 72),
            ),
            const SizedBox(height: 16),
            Text(product.productName, style: AppTheme.heading2),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              children: [
                Chip(label: Text(product.categoryName)),
                if (product.taxed) const Chip(label: Text('VAT'), backgroundColor: Color(0xFFFFF3CD)),
              ],
            ),
            const SizedBox(height: 12),
            Text(currency.format(product.productCost), style: const TextStyle(color: AppTheme.primaryColor, fontSize: 24, fontWeight: FontWeight.bold)),
            const SizedBox(height: 16),
            const Text('Description', style: AppTheme.heading3),
            const SizedBox(height: 6),
            Text(product.description, style: AppTheme.body1),
            const SizedBox(height: 16),
            if (product.inStock > 0) ...[
              const Text('Quantity', style: AppTheme.heading3),
              const SizedBox(height: 8),
              Row(children: [
                IconButton(onPressed: qty > 1 ? () => setState(() => qty--) : null, icon: const Icon(Icons.remove)),
                Text('$qty', style: const TextStyle(fontWeight: FontWeight.w600)),
                IconButton(onPressed: qty < product.inStock ? () => setState(() => qty++) : null, icon: const Icon(Icons.add)),
                const Spacer(),
                Text('In stock: ${product.inStock}', style: AppTheme.body2),
              ]),
              const SizedBox(height: 12),
              Obx(() {
                final inCart = cart.isInCart(product.productId);
                return ElevatedButton.icon(
                  onPressed: () {
                    if (inCart) {
                      cart.removeItem(product.productId);
                      Get.snackbar('Removed', 'Removed from cart', snackPosition: SnackPosition.BOTTOM);
                    } else {
                      cart.addItem(product, quantity: qty);
                      Get.snackbar('Added', 'Added $qty to cart', snackPosition: SnackPosition.BOTTOM);
                    }
                  },
                  icon: Icon(inCart ? Icons.remove_shopping_cart : Icons.add_shopping_cart),
                  label: Text(inCart ? 'Remove from Cart' : 'Add to Cart'),
                );
              }),
              const SizedBox(height: 8),
              OutlinedButton.icon(
                onPressed: () => Get.snackbar('Info', 'M-Pesa payment coming soon!', snackPosition: SnackPosition.BOTTOM, backgroundColor: AppTheme.warningColor, colorText: Colors.white),
                icon: const Icon(Icons.payment, color: AppTheme.secondaryColor),
                label: const Text('Buy with M-Pesa', style: TextStyle(color: AppTheme.secondaryColor)),
              ),
            ] else ...[
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(color: AppTheme.errorColor.withOpacity(0.08), borderRadius: BorderRadius.circular(8)),
                child: const Text('Out of Stock', style: TextStyle(color: AppTheme.errorColor, fontWeight: FontWeight.w600)),
              )
            ]
          ],
        ),
      ),
    );
  }
}
