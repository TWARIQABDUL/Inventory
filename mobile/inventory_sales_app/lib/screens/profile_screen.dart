import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:inventory_sales_app/controllers/auth_controller.dart';
import 'package:inventory_sales_app/routes/app_routes.dart';
import 'package:inventory_sales_app/utils/theme.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final _storage = GetStorage();

    final auth = Get.isRegistered<AuthController>()
        ? Get.find<AuthController>()
        : Get.put(AuthController(), permanent: true);
final strg = _storage.getValues();

print("got$strg");
    return Scaffold(
      appBar: AppBar(title: const Text('Profile')),
      body: Obx(() => Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                CircleAvatar(radius: 40, backgroundColor: AppTheme.primaryColor, child: const Icon(Icons.person, color: Colors.white, size: 40)),
                const SizedBox(height: 12),
                Text(auth.userName.value.isEmpty ? 'User' : auth.userName.value, style: AppTheme.heading2),
                const SizedBox(height: 4),
                Text(auth.userEmail.value.isEmpty ? 'user@example.com' : auth.userEmail.value, style: AppTheme.body2),
                const SizedBox(height: 24),
                ListTile(leading: const Icon(Icons.shopping_bag_outlined), title: const Text('My Orders'), subtitle: const Text('Coming soon')),
                ListTile(leading: const Icon(Icons.location_on_outlined), title: const Text('Delivery Addresses'), subtitle: const Text('Coming soon')),
                ListTile(leading: const Icon(Icons.payment_outlined), title: const Text('Payment Methods'), subtitle: const Text('Coming soon')),
                const Spacer(),
                OutlinedButton.icon(
                  onPressed: () => Get.dialog(AlertDialog(
                    title: const Text('Logout'),
                    content: const Text('Are you sure you want to logout?'),
                    actions: [
                      TextButton(onPressed: Get.back, child: const Text('Cancel')),
                      TextButton(
                        onPressed: () {
                          auth.logout();
                          Get.offAllNamed(AppRoutes.login);
                        },
                        child: const Text('Logout', style: TextStyle(color: AppTheme.errorColor)),
                      )
                    ],
                  )),
                  icon: const Icon(Icons.logout, color: AppTheme.errorColor),
                  label: const Text('Logout', style: TextStyle(color: AppTheme.errorColor)),
                )
              ],
            ),
          )),
    );
  }
}
