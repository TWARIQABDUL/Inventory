import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:inventory_sales_app/models/order_model.dart';

class OrderDetailScreen extends StatelessWidget {
  const OrderDetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final Order? order = Get.arguments as Order?;

    return Scaffold(
      appBar: AppBar(
        title: Text(order != null ? 'Order ${order.id}' : 'Order Details'),
      ),
      body: order == null
          ? const Center(child: Text('Order not found.'))
          : Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Order ID: ${order.id}',
                      style:
                          const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  Text('Date: ${DateFormat.yMMMd().add_jm().format(order.date)}'),
                  const SizedBox(height: 8),
                  Text('Total: KES ${order.total.toStringAsFixed(2)}'),
                  const SizedBox(height: 8),
                  Text('Status: ${order.status}'),
                  const SizedBox(height: 16),
                  const Text('Items:',
                      style:
                          TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                  ...order.items.map((item) => Text('- $item')).toList(),
                ],
              ),
            ),
    );
  }
}