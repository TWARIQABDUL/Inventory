import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:inventory_sales_app/controllers/auth_controller.dart';
import 'package:inventory_sales_app/controllers/product_controller.dart';
import 'package:inventory_sales_app/routes/app_routes.dart';
import 'package:inventory_sales_app/utils/theme.dart';
import 'package:inventory_sales_app/widgets/category_filter.dart';
import 'package:inventory_sales_app/widgets/product_card.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final authController = Get.find<AuthController>();
    final productController = Get.find<ProductController>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Inventory Store'),
        actions: [
          IconButton(
            icon: const Icon(Icons.shopping_cart),
            onPressed: () => Get.toNamed(AppRoutes.cart),
          ),
          IconButton(
            icon: const Icon(Icons.person),
            onPressed: () => Get.toNamed(AppRoutes.profile),
          ),
        ],
      ),
      body: Column(
        children: [
          // Welcome Section
          Container(
            padding: const EdgeInsets.all(16),
            child: Obx(() => Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Welcome back,',
                  style: AppTheme.body2,
                ),
                Text(
                  authController.userName.value,
                  style: AppTheme.heading2,
                ),
              ],
            )),
          ),
          
          // Category Filter
          const CategoryFilter(),
          
          // Products Section
          Expanded(
            child: Obx(() {
              if (productController.isLoading.value) {
                return const Center(
                  child: CircularProgressIndicator(),
                );
              }
              
              if (productController.error.isNotEmpty) {
                return Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.error_outline,
                        size: 64,
                        color: AppTheme.errorColor,
                      ),
                      const SizedBox(height: 16),
                      Text(
                        'Failed to load products',
                        style: AppTheme.heading3,
                      ),
                      const SizedBox(height: 8),
                      Text(
                        productController.error.value,
                        style: AppTheme.body2,
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: () => productController.refreshProducts(),
                        child: const Text('Retry'),
                      ),
                    ],
                  ),
                );
              }
              
              if (productController.filteredProducts.isEmpty) {
                return const Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.inventory_2_outlined,
                        size: 64,
                        color: AppTheme.textSecondaryColor,
                      ),
                      SizedBox(height: 16),
                      Text(
                        'No products found',
                        style: AppTheme.heading3,
                      ),
                      SizedBox(height: 8),
                      Text(
                        'Try selecting a different category',
                        style: AppTheme.body2,
                      ),
                    ],
                  ),
                );
              }
              
              return RefreshIndicator(
                onRefresh: () async {
                  productController.clearError();
                  await productController.refreshProducts();
                },
                child: GridView.builder(
                  padding: const EdgeInsets.all(16),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    childAspectRatio: 0.75,
                    crossAxisSpacing: 16,
                    mainAxisSpacing: 16,
                  ),
                  itemCount: productController.filteredProducts.length,
                  itemBuilder: (context, index) {
                    final product = productController.filteredProducts[index];
                    return ProductCard(product: product);
                  },
                ),
              );
            }),
          ),
        ],
      ),
    );
  }
}
