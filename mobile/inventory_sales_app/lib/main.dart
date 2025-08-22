import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:inventory_sales_app/controllers/auth_controller.dart';
import 'package:inventory_sales_app/controllers/product_controller.dart';
import 'package:inventory_sales_app/controllers/cart_controller.dart';
import 'package:inventory_sales_app/routes/app_routes.dart';
import 'package:inventory_sales_app/utils/theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await GetStorage.init();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'Inventory Sales Store',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      initialRoute: AppRoutes.splash,
      getPages: AppRoutes.routes,
      initialBinding: BindingsBuilder(() {
        Get.lazyPut<AuthController>(() => AuthController());
        Get.lazyPut<ProductController>(() => ProductController());
        Get.lazyPut<CartController>(() => CartController());
      }),
    );
  }
}
