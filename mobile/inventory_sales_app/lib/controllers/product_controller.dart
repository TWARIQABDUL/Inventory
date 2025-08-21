import 'package:get/get.dart';
import 'package:inventory_sales_app/models/product.dart';

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
  }

  Future<void> loadProducts() async {
    isLoading.value = true;
    error.value = '';
    await Future.delayed(const Duration(milliseconds: 600));
    categories.assignAll([
      ProductCategory(categoryId: 1, name: 'Electronics'),
      ProductCategory(categoryId: 2, name: 'Clothing'),
      ProductCategory(categoryId: 3, name: 'Books'),
      ProductCategory(categoryId: 4, name: 'Home & Garden'),
    ]);
    products.assignAll([
      Product(
        productId: 1,
        name: 'Smartphone',
        description: 'Latest smartphone with advanced features',
        taxable: true,
        category: categories[0],
        stock: Stock(stockId: 1, quantity: 50),
        priceList: PriceList(priceListId: 1, price: 29999.99),
      ),
      Product(
        productId: 2,
        name: 'Laptop',
        description: 'High-performance laptop for work and gaming',
        taxable: true,
        category: categories[0],
        stock: Stock(stockId: 2, quantity: 25),
        priceList: PriceList(priceListId: 2, price: 89999.99),
      ),
      Product(
        productId: 3,
        name: 'T-Shirt',
        description: 'Comfortable cotton t-shirt',
        taxable: false,
        category: categories[1],
        stock: Stock(stockId: 3, quantity: 100),
        priceList: PriceList(priceListId: 3, price: 1499.99),
      ),
    ]);

    isLoading.value = false;
  }

  void setSelectedCategory(String category) => selectedCategory.value = category;

  Product? getProductById(int id) {
    return products.firstWhereOrNull((p) => p.productId == id);
  }
}
