class Product {
  final int productId;
  final String name;
  final String description;
  final bool taxable;
  final ProductCategory category;
  final Stock stock;
  final PriceList priceList;

  Product({
    required this.productId,
    required this.name,
    required this.description,
    required this.taxable,
    required this.category,
    required this.stock,
    required this.priceList,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      productId: json['productId'] ?? 0,
      name: json['name'] ?? '',
      description: json['description'] ?? '',
      taxable: json['taxable'] ?? false,
      category: ProductCategory.fromJson(json['category'] ?? {}),
      stock: Stock.fromJson(json['stock'] ?? {}),
      priceList: PriceList.fromJson(json['priceList'] ?? {}),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'productId': productId,
      'name': name,
      'description': description,
      'taxable': taxable,
      'category': category.toJson(),
      'stock': stock.toJson(),
      'priceList': priceList.toJson(),
    };
  }
}

class ProductCategory {
  final int categoryId;
  final String name;

  ProductCategory({
    required this.categoryId,
    required this.name,
  });

  factory ProductCategory.fromJson(Map<String, dynamic> json) {
    return ProductCategory(
      categoryId: json['categoryId'] ?? 0,
      name: json['name'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'categoryId': categoryId,
      'name': name,
    };
  }
}

class Stock {
  final int stockId;
  final int quantity;

  Stock({
    required this.stockId,
    required this.quantity,
  });

  factory Stock.fromJson(Map<String, dynamic> json) {
    return Stock(
      stockId: json['stockId'] ?? 0,
      quantity: json['quantity'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'stockId': stockId,
      'quantity': quantity,
    };
  }
}

class PriceList {
  final int priceListId;
  final double price;

  PriceList({
    required this.priceListId,
    required this.price,
  });

  factory PriceList.fromJson(Map<String, dynamic> json) {
    return PriceList(
      priceListId: json['priceListId'] ?? 0,
      price: (json['price'] ?? 0.0).toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'priceListId': priceListId,
      'price': price,
    };
  }
}
