class OrderItem {
  final String productId;
  final int quantity;
  final double costPrice;
  final double discount;
  final double actualAmount;

  OrderItem({
    required this.productId,
    required this.quantity,
    required this.costPrice,
    this.discount = 0.0,
  }) : actualAmount = costPrice - discount;

  Map<String, dynamic> toJson() => {
        "productId": productId,
        "quantity": quantity,
        "costPrice": costPrice,
        "discount": discount,
        "actualAmount": actualAmount,
      };
}
