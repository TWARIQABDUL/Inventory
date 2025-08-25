import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:inventory_sales_app/controllers/product_controller.dart';
import 'package:inventory_sales_app/controllers/cart_controller.dart';
import 'package:inventory_sales_app/widgets/product_card.dart';
import 'package:inventory_sales_app/widgets/category_filter.dart';
import 'package:inventory_sales_app/utils/theme.dart';

class ProductsScreen extends StatelessWidget {
  const ProductsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final products = Get.isRegistered<ProductController>()
        ? Get.find<ProductController>()
        : Get.put(ProductController(), permanent: true);
    final cart = Get.isRegistered<CartController>()
        ? Get.find<CartController>()
        : Get.put(CartController(), permanent: true);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Products'),
        actions: [
          Obx(() => Stack(children: [
                IconButton(
                    onPressed: () {}, icon: const Icon(Icons.shopping_cart)),
                if (cart.itemCount > 0)
                  Positioned(
                    right: 8,
                    top: 8,
                    child: Container(
                      padding: const EdgeInsets.all(2),
                      decoration: BoxDecoration(
                          color: AppTheme.errorColor,
                          borderRadius: BorderRadius.circular(10)),
                      constraints:
                          const BoxConstraints(minWidth: 16, minHeight: 16),
                      child: Text('${cart.itemCount}',
                          style: const TextStyle(
                              color: Colors.white,
                              fontSize: 10,
                              fontWeight: FontWeight.bold),
                          textAlign: TextAlign.center),
                    ),
                  )
              ])),
        ],
      ),
      body: Obx(() {
        if (products.isLoading.value) {
          return const Center(child: CircularProgressIndicator());
        }
        if (products.error.isNotEmpty) {
          return Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.error_outline,
                    size: 48, color: AppTheme.errorColor),
                const SizedBox(height: 8),
                Text(products.error.value),
                const SizedBox(height: 12),
                ElevatedButton(
                    onPressed: () => products.loadProducts(),
                    child: const Text('Retry')),
              ],
            ),
          );
        }

        return Column(
          children: [
            CategoryFilter(
              categories: products.categories,
              selectedCategory: products.selectedCategory.value,
              onCategorySelected: products.setSelectedCategory,
            ),
            Expanded(
              child: GridView.builder(
                padding: const EdgeInsets.all(16),
                itemCount: products.filteredProducts.length,
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  childAspectRatio: 0.72,
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                ),
                itemBuilder: (_, i) =>
                    ProductCard(product: products.filteredProducts[i]),
              ),
            )
          ],
        );
      }),
    );
  }
}
