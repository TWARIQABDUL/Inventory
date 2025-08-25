import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:inventory_sales_app/controllers/auth_controller.dart';
import 'package:inventory_sales_app/routes/app_routes.dart';
import 'package:inventory_sales_app/utils/theme.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final authController = Get.find<AuthController>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              Get.dialog(
                AlertDialog(
                    title: const Text('Logout'),
                    content: const Text('Are you sure you want to logout?'),
                    actions: [
                    TextButton(
                      onPressed: () => Get.back(),
                      child: const Text('Cancel'),
                    ),
                      TextButton(
                        onPressed: () {
                        authController.logout();
                        Get.back();
                          Get.offAllNamed(AppRoutes.login);
                        },
                      child: const Text('Logout'),
                    ),
                  ],
                ),
              );
            },
          ),
        ],
      ),
      body: Obx(() => SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // Profile Header
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: AppTheme.primaryColor,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                children: [
                  CircleAvatar(
                    radius: 40,
                    backgroundColor: Colors.white,
                    child: Icon(
                      Icons.person,
                      size: 40,
                      color: AppTheme.primaryColor,
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    authController.userName.value,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    authController.userEmail.value,
                    style: const TextStyle(
                      color: Colors.white70,
                      fontSize: 16,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            
            // Menu Items
            Card(
              child: Column(
                children: [
                  ListTile(
                    leading: const Icon(Icons.person_outline, color: AppTheme.primaryColor),
                    title: const Text('Edit Profile'),
                    subtitle: const Text('Update your personal information'),
                    trailing: const Icon(Icons.chevron_right),
                    onTap: () {
                      Get.snackbar(
                        'Coming Soon',
                        'Profile editing will be available soon!',
                        backgroundColor: AppTheme.warningColor,
                        colorText: Colors.white,
                      );
                    },
                  ),
                  const Divider(height: 1),
                  ListTile(
                    leading: const Icon(Icons.notifications_outlined, color: AppTheme.primaryColor),
                    title: const Text('Notifications'),
                    subtitle: const Text('Manage your notification preferences'),
                    trailing: const Icon(Icons.chevron_right),
                    onTap: () {
                      Get.snackbar(
                        'Coming Soon',
                        'Notification settings will be available soon!',
                        backgroundColor: AppTheme.warningColor,
                        colorText: Colors.white,
                      );
                    },
                  ),
                  const Divider(height: 1),
                  ListTile(
                    leading: const Icon(Icons.security, color: AppTheme.primaryColor),
                    title: const Text('Security'),
                    subtitle: const Text('Change password and security settings'),
                    trailing: const Icon(Icons.chevron_right),
                    onTap: () {
                      Get.snackbar(
                        'Coming Soon',
                        'Security settings will be available soon!',
                        backgroundColor: AppTheme.warningColor,
                        colorText: Colors.white,
                      );
                    },
                  ),
                  const Divider(height: 1),
                  ListTile(
                    leading: const Icon(Icons.help_outline, color: AppTheme.primaryColor),
                    title: const Text('Help & Support'),
                    subtitle: const Text('Get help and contact support'),
                    trailing: const Icon(Icons.chevron_right),
                    onTap: () {
                      Get.snackbar(
                        'Coming Soon',
                        'Help and support will be available soon!',
                        backgroundColor: AppTheme.warningColor,
                        colorText: Colors.white,
                      );
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            
            // App Info
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'App Information',
                      style: AppTheme.heading3,
                    ),
                    const SizedBox(height: 12),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('Version'),
                        Text(
                          '1.0.0',
                          style: AppTheme.body2,
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('Build'),
                        Text(
                          '1',
                          style: AppTheme.body2,
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
              ],
            ),
          )),
    );
  }
}
