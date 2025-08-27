import 'package:inventory_sales_app/models/product.dart';

class CartItem {
  final Product product;
  int quantity;
  final discount = 0;

  CartItem({
    required this.product,
    this.quantity = 1,
  });

  double get totalPrice => product.productCost * quantity;
  double get actualAmount => (product.productCost * quantity) - discount;
  Map<String, dynamic> toJson() => {
        'product': product.toJson(),
        'quantity': quantity,
      };

  factory CartItem.fromJson(Map<String, dynamic> json) => CartItem(
        product: Product.fromJson(json['product'] ?? {}),
        quantity: json['quantity'] ?? 1,
      );
}
