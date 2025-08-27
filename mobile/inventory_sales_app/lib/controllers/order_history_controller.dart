import 'package:get/get.dart';
import 'package:inventory_sales_app/models/order_model.dart';

class OrderHistoryController extends GetxController {
  final isLoading = true.obs;
  final orders = <Order>[].obs;

  @override
  void onInit() {
    super.onInit();
    fetchOrders();
  }

  void fetchOrders() {
    // Simulate API call with static data
    Future.delayed(const Duration(seconds: 1), () {
      orders.value = [
        Order(
          id: 'ORD-001',
          date: DateTime.now().subtract(const Duration(days: 1)),
          total: 2710.0,
          status: 'COMPLETED',
          items: ['Product A', 'Product B'],
        ),
        Order(
          id: 'ORD-002',
          date: DateTime.now().subtract(const Duration(days: 3)),
          total: 1550.50,
          status: 'COMPLETED',
          items: ['Product C'],
        ),
        Order(
          id: 'ORD-003',
          date: DateTime.now().subtract(const Duration(days: 5)),
          total: 890.0,
          status: 'CANCELLED',
          items: ['Product D', 'Product E'],
        ),
      ];
      isLoading.value = false;
    });
  }
}