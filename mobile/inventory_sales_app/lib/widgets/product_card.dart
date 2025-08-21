import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:inventory_sales_app/models/product.dart';
import 'package:inventory_sales_app/controllers/cart_controller.dart';
import 'package:inventory_sales_app/routes/app_routes.dart';
import 'package:inventory_sales_app/utils/theme.dart';

class ProductCard extends StatelessWidget {
  final Product product;
  const ProductCard({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    final currency = NumberFormat.currency(symbol: 'KES ');
    final cart = Get.isRegistered<CartController>()
        ? Get.find<CartController>()
        : Get.put(CartController(), permanent: true);
    final isInCart = cart.isInCart(product.productId);

    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: () => Get.toNamed(AppRoutes.productDetail, arguments: product),
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Container(
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: AppTheme.backgroundColor,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Icon(Icons.inventory_2, color: AppTheme.primaryColor, size: 40),
                ),
              ),
              const SizedBox(height: 8),
              Text(
                product.name,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(fontWeight: FontWeight.w600),
              ),
              const SizedBox(height: 2),
              Text(
                product.description,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: AppTheme.body2,
              ),
              const SizedBox(height: 4),
              Text(product.category.name, style: AppTheme.caption),
              const Spacer(),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    currency.format(product.priceList.price),
                    style: const TextStyle(color: AppTheme.primaryColor, fontWeight: FontWeight.w700),
                  ),
                  IconButton(
                    onPressed: product.stock.quantity > 0
                        ? () {
                            if (cart.isInCart(product.productId)) {
                              cart.removeItem(product.productId);
                              Get.snackbar('Removed', 'Removed from cart', snackPosition: SnackPosition.BOTTOM);
                            } else {
                              cart.addItem(product);
                              Get.snackbar('Added', 'Added to cart', snackPosition: SnackPosition.BOTTOM);
                            }
                          }
                        : null,
                    icon: Icon(
                      isInCart ? Icons.remove_shopping_cart : Icons.add_shopping_cart,
                      color: isInCart ? AppTheme.errorColor : AppTheme.primaryColor,
                    ),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
