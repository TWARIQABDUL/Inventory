// import 'dart:convert';

import 'dart:convert';

import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:inventory_sales_app/models/cart_item.dart';
import 'package:http/http.dart' as http;

class OrderController extends GetxController {
  final box = GetStorage();
  RxBool loading = false.obs;

  Map<String, dynamic> createOrder(List<CartItem> cartItems) {
    final userId = box.read('user_id');

    double totalAmount = cartItems.fold(
        0, (sum, item) => sum + (item.product.productCost * item.quantity));

    double discount = 0;
    double actualAmount = totalAmount - discount;

    final orderItems = cartItems.map((item) {
      return {
        "costPrice": item.product.productCost.toDouble(),
        "discount": 0.0,
        "actualAmount": (item.product.productCost * item.quantity).toDouble(),
        "product": {"productId": item.product.productId}
      };
    }).toList();

    final order = {
      "totalAmount": totalAmount,
      "discount": discount,
      "actualAmount": actualAmount,
      "status": "PENDING",
      "user": {"userId": userId},
      "orderItems": orderItems,
    };

    return order;
  }

  Future<dynamic> saveOrder(List<CartItem> cartItems) async {
    loading.value = true;

    final orderToSubmit = createOrder(cartItems);
    const String link = "http://192.168.254.115:1010/api/orders";

    try {
      final response = await http.post(Uri.parse(link),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: jsonEncode(orderToSubmit));
      if (response.statusCode == 200) {
        print("Order recieved success full");
        loading.value = false;

        return true;
      } else {
        print("yoo gotch u");
        loading.value = false;

        return false;
      }
    } catch (e) {
      print("Error Happen $e");
      loading.value = false;

      return false;
    } finally {
      // isLoading.value = false;
    }
  }
}
