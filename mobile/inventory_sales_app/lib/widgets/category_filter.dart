import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:inventory_sales_app/controllers/product_controller.dart';
import 'package:inventory_sales_app/utils/theme.dart';

class CategoryFilter extends StatelessWidget {
  const CategoryFilter({super.key});

  @override
  Widget build(BuildContext context) {
    final productController = Get.find<ProductController>();

    return Obx(() {
      final categories = ['All', ...productController.categories.map((c) => c.name)];
      
      return SizedBox(
        height: 50,
        child: ListView.separated(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          scrollDirection: Axis.horizontal,
          itemBuilder: (context, index) {
            final category = categories[index];
            final isSelected = category == productController.selectedCategory.value;
            return FilterChip(
              label: Text(category),
              selected: isSelected,
              onSelected: (_) => productController.setSelectedCategory(category),
              selectedColor: AppTheme.primaryColor,
              checkmarkColor: Colors.white,
              labelStyle: TextStyle(
                color: isSelected ? Colors.white : AppTheme.textPrimaryColor,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
              ),
            );
          },
          separatorBuilder: (_, __) => const SizedBox(width: 8),
          itemCount: categories.length,
        ),
      );
    });
  }
}
