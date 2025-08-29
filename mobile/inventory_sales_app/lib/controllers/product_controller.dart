import 'dart:convert';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:inventory_sales_app/models/product.dart';

class ProductController extends GetxController {
  final products = <Product>[].obs;
  final isLoading = false.obs;
  final error = ''.obs;
  final selectedCategory = 'All'.obs;

  List<Product> get filteredProducts => selectedCategory.value == 'All'
      ? products
      : products.where((p) => p.categoryName == selectedCategory.value).toList();

  @override
  void onInit() {
    super.onInit();
    loadProducts();
  }

  Future<void> loadProducts() async {
    isLoading.value = true;
    error.value = '';
    try {
      final response = await http.get(Uri.parse('http://192.168.254.115:1010/api/products'));
      if (response.statusCode == 200) {
        final List<dynamic> productJson = json.decode(response.body);
        products.assignAll(productJson.map((json) => Product.fromJson(json)).toList());
      } else {
        error.value = 'Failed to load products';
      }
    } catch (e) {
      error.value = e.toString();
    } finally {
      isLoading.value = false;
    }
  }

  void setSelectedCategory(String category) => selectedCategory.value = category;

  Product? getProductById(int id) {
    return products.firstWhereOrNull((p) => p.productId == id);
  }

  List<String> get categories {
    final categories = products.map((p) => p.categoryName).toSet().toList();
    categories.insert(0, 'All');
    return categories;
  }
}