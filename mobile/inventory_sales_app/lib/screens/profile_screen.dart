import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:inventory_sales_app/controllers/auth_controller.dart';
import 'package:inventory_sales_app/routes/app_routes.dart';
import 'package:inventory_sales_app/utils/theme.dart';

class ProfileScreen extends GetView<AuthController> {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              controller.logout();
              Get.offAllNamed(AppRoutes.login);
            },
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          Obx(() => CircleAvatar(
                radius: 50,
                backgroundColor: AppTheme.primaryColor,
                child: Text(
                  controller.userName.value.isNotEmpty
                      ? controller.userName.value[0].toUpperCase()
                      : 'U',
                  style: const TextStyle(fontSize: 40, color: Colors.white),
                ),
              )),
          const SizedBox(height: 16),
          Obx(() => Center(
                child: Text(
                  controller.userName.value,
                  style: AppTheme.heading3,
                ),
              )),
          Obx(() => Center(
                child: Text(
                  controller.userEmail.value,
                  style: AppTheme.body2,
                ),
              )),
          const SizedBox(height: 24),
          const Divider(),
          ListTile(
            leading: const Icon(Icons.history),
            title: const Text('Order History'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              Get.toNamed(AppRoutes.orderHistory);
            },
          ),
          const Divider(),
        ],
      ),
    );
  }
}
