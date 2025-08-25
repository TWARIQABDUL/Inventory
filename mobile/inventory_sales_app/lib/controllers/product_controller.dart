import 'package:get/get.dart';
import 'package:inventory_sales_app/models/product.dart';
import 'package:inventory_sales_app/services/api_service.dart';

class ProductController extends GetxController {
  final products = <Product>[].obs;
  final categories = <ProductCategory>[].obs;
  final isLoading = false.obs;
  final error = ''.obs;
  final selectedCategory = 'All'.obs;

  List<Product> get filteredProducts => selectedCategory.value == 'All'
      ? products
      : products.where((p) => p.category.name == selectedCategory.value).toList();

  @override
  void onInit() {
    super.onInit();
    loadProducts();
    loadCategories();
  }

  Future<void> loadProducts() async {
    isLoading.value = true;
    error.value = '';
    
    try {
      final productsData = await ApiService.getProducts();
      final loadedProducts = productsData.map((json) => Product.fromJson(json)).toList();
      
      // Filter out products with invalid data
      final validProducts = loadedProducts.where((product) => 
        product.productId > 0 && product.name.isNotEmpty
      ).toList();
      
      if (validProducts.isEmpty) {
        // If no valid products from API, load dummy data
        _loadDummyProducts();
      } else {
        products.assignAll(validProducts);
      }
    } catch (e) {
      error.value = e.toString();
      // Fallback to dummy data if API fails
      _loadDummyProducts();
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> loadCategories() async {
    try {
      final categoriesData = await ApiService.getCategories();
      final loadedCategories = categoriesData.map((json) => ProductCategory.fromJson(json)).toList();
      
      // Filter out categories with invalid data
      final validCategories = loadedCategories.where((category) => 
        category.categoryId > 0 && category.name.isNotEmpty
      ).toList();
      
      if (validCategories.isEmpty) {
        // If no valid categories from API, load dummy categories
        _loadDummyCategories();
      } else {
        categories.assignAll(validCategories);
      }
    } catch (e) {
      // Fallback to dummy categories if API fails
      _loadDummyCategories();
    }
  }

  void _loadDummyProducts() {
    products.assignAll([
      Product(
        productId: 1,
        name: 'Smartphone',
        description: 'Latest smartphone with advanced features',
        taxable: true,
        category: ProductCategory(categoryId: 1, name: 'Electronics', description: 'Phones, laptops, accessories'),
        stock: Stock(stockId: 1, quantity: 50),
        priceList: PriceList(priceListId: 1, price: 29999.99),
      ),
      Product(
        productId: 2,
        name: 'Laptop',
        description: 'High-performance laptop for work and gaming',
        taxable: true,
        category: ProductCategory(categoryId: 1, name: 'Electronics', description: 'Phones, laptops, accessories'),
        stock: Stock(stockId: 2, quantity: 25),
        priceList: PriceList(priceListId: 2, price: 89999.99),
      ),
      Product(
        productId: 3,
        name: 'T-Shirt',
        description: 'Comfortable cotton t-shirt',
        taxable: false,
        category: ProductCategory(categoryId: 2, name: 'Clothing', description: 'Men, women and kids apparel'),
        stock: Stock(stockId: 3, quantity: 100),
        priceList: PriceList(priceListId: 3, price: 1499.99),
      ),
      Product(
        productId: 4,
        name: 'Wireless Headphones',
        description: 'Premium wireless headphones with noise cancellation',
        taxable: true,
        category: ProductCategory(categoryId: 1, name: 'Electronics', description: 'Phones, laptops, accessories'),
        stock: Stock(stockId: 4, quantity: 30),
        priceList: PriceList(priceListId: 4, price: 15999.99),
      ),
      Product(
        productId: 5,
        name: 'Jeans',
        description: 'Classic blue jeans for everyday wear',
        taxable: false,
        category: ProductCategory(categoryId: 2, name: 'Clothing', description: 'Men, women and kids apparel'),
        stock: Stock(stockId: 5, quantity: 75),
        priceList: PriceList(priceListId: 5, price: 2499.99),
      ),
    ]);
  }

  void _loadDummyCategories() {
    categories.assignAll([
      ProductCategory(categoryId: 1, name: 'Electronics', description: 'Phones, laptops, accessories'),
      ProductCategory(categoryId: 2, name: 'Clothing', description: 'Men, women and kids apparel'),
      ProductCategory(categoryId: 3, name: 'Books', description: 'Fiction, non-fiction and textbooks'),
      ProductCategory(categoryId: 4, name: 'Home & Garden', description: 'Furniture, appliances and decor'),
    ]);
  }

  void setSelectedCategory(String category) => selectedCategory.value = category;

  Product? getProductById(int id) {
    return products.firstWhereOrNull((p) => p.productId == id);
  }

  Future<void> refreshProducts() async {
    await loadProducts();
  }

  void clearError() {
    error.value = '';
  }
}
