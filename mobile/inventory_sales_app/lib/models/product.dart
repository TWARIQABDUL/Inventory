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

  // Updated to match AllProduct DTO from backend
  factory Product.fromJson(Map<String, dynamic> json) {
    try {
      return Product(
        productId: json['productId']?.toInt() ?? 0,
        name: json['productName'] ?? json['name'] ?? '',
        description: json['description'] ?? '',
        taxable: json['taxed'] ?? json['taxable'] ?? false,
        category: ProductCategory.fromJson({
          'categoryId': json['categoryId'] ?? 0,
          'name': json['categoryName'] ?? json['category']?['name'] ?? '',
          'description': json['category']?['description'] ?? '',
        }),
        stock: Stock.fromJson({
          'stockId': json['stockId'] ?? 0,
          'quantity': json['inStock']?.toInt() ?? json['stock']?['quantity']?.toInt() ?? 0,
        }),
        priceList: PriceList.fromJson({
          'priceListId': json['priceListId'] ?? 0,
          'price': (json['productCost'] ?? json['priceList']?['price'] ?? 0.0).toDouble(),
        }),
      );
    } catch (e) {
      // Return a default product if parsing fails
      return Product(
        productId: 0,
        name: 'Unknown Product',
        description: 'Product information unavailable',
        taxable: false,
        category: ProductCategory(categoryId: 0, name: 'Unknown', description: ''),
        stock: Stock(stockId: 0, quantity: 0),
        priceList: PriceList(priceListId: 0, price: 0.0),
      );
    }
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
  final String description;

  ProductCategory({
    required this.categoryId,
    required this.name,
    required this.description,
  });

  factory ProductCategory.fromJson(Map<String, dynamic> json) {
    try {
      return ProductCategory(
        categoryId: json['categoryId']?.toInt() ?? 0,
        name: json['name'] ?? '',
        description: json['description'] ?? '',
      );
    } catch (e) {
      return ProductCategory(
        categoryId: 0,
        name: 'Unknown Category',
        description: '',
      );
    }
  }

  Map<String, dynamic> toJson() {
    return {
      'categoryId': categoryId,
      'name': name,
      'description': description,
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
    try {
      return Stock(
        stockId: json['stockId']?.toInt() ?? 0,
        quantity: json['quantity']?.toInt() ?? 0,
      );
    } catch (e) {
      return Stock(stockId: 0, quantity: 0);
    }
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
    try {
      return PriceList(
        priceListId: json['priceListId']?.toInt() ?? 0,
        price: (json['price'] ?? 0.0).toDouble(),
      );
    } catch (e) {
      return PriceList(priceListId: 0, price: 0.0);
    }
  }

  Map<String, dynamic> toJson() {
    return {
      'priceListId': priceListId,
      'price': price,
    };
  }
}
