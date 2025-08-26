import 'package:flutter/material.dart';
import 'package:inventory_sales_app/utils/theme.dart';

class CategoryFilter extends StatelessWidget {
  final List<String> categories;
  final String selectedCategory;
  final ValueChanged<String> onCategorySelected;

  const CategoryFilter({super.key, required this.categories, required this.selectedCategory, required this.onCategorySelected});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 50,
      child: ListView.separated(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        scrollDirection: Axis.horizontal,
        itemBuilder: (context, index) {
          final category = categories[index];
          final isSelected = category == selectedCategory;
          return FilterChip(
            label: Text(category),
            selected: isSelected,
            onSelected: (_) => onCategorySelected(category),
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
  }
}