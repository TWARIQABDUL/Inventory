import 'package:inventory_sales_app/models/order_items.dart';

class Order {
  final String userId;
  final double totalAmount;
  final double discount;
  final double actualAmount;
  final List<OrderItem> orderItems;

  Order({
    required this.userId,
    required this.totalAmount,
    this.discount = 0.0,
    required this.actualAmount,
    required this.orderItems,
  });

  Map<String, dynamic> toJson() => {
        "userId": userId,
        "totalAmount": totalAmount,
        "discount": discount,
        "actualAmount": actualAmount,
        "orderItems": orderItems.map((item) => item.toJson()).toList(),
      };
}
