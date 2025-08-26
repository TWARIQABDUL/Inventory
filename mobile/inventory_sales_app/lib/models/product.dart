class Product {
  final int productId;
  final String productName;
  final String description;
  final String categoryName;
  final bool taxed;
  final double productCost;
  final int inStock;
  final int priceId;

  Product({
    required this.productId,
    required this.productName,
    required this.description,
    required this.categoryName,
    required this.taxed,
    required this.productCost,
    required this.inStock,
    required this.priceId,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      productId: (json['productId'] as num? ?? 0).toInt(),
      productName: json['productName'] as String? ?? '',
      description: json['description'] as String? ?? '',
      categoryName: json['categoryName'] as String? ?? '',
      taxed: json['taxed'] as bool? ?? false,
      productCost: (json['productCost'] as num? ?? 0.0).toDouble(),
      inStock: (json['inStock'] as num? ?? 0).toInt(),
      priceId: (json['priceId'] as num? ?? 0).toInt(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'productId': productId,
      'productName': productName,
      'description': description,
      'categoryName': categoryName,
      'taxed': taxed,
      'productCost': productCost,
      'inStock': inStock,
      'priceId': priceId,
    };
  }
}
