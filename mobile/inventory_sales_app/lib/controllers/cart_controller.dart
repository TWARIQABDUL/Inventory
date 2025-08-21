import 'package:get/get.dart';
import 'package:inventory_sales_app/models/cart_item.dart';
import 'package:inventory_sales_app/models/product.dart';

class CartController extends GetxController {
  final items = <CartItem>[].obs;

  int get itemCount => items.length;
  bool get isEmpty => items.isEmpty;
  double get totalAmount => items.fold(0.0, (s, i) => s + i.totalPrice);

  void addItem(Product product, {int quantity = 1}) {
    final idx = items.indexWhere((i) => i.product.productId == product.productId);
    if (idx >= 0) {
      items[idx].quantity += quantity;
      items.refresh();
    } else {
      items.add(CartItem(product: product, quantity: quantity));
    }
  }

  void removeItem(int productId) {
    items.removeWhere((i) => i.product.productId == productId);
  }

  void updateQuantity(int productId, int quantity) {
    final idx = items.indexWhere((i) => i.product.productId == productId);
    if (idx >= 0) {
      if (quantity <= 0) {
        items.removeAt(idx);
      } else {
        items[idx].quantity = quantity;
        items.refresh();
      }
    }
  }

  bool isInCart(int productId) => items.any((i) => i.product.productId == productId);
  int getQuantity(int productId) =>
      items.firstWhereOrNull((i) => i.product.productId == productId)?.quantity ?? 0;
  void clear() => items.clear();
}
