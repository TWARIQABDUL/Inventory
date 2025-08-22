import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:inventory_sales_app/controllers/auth_controller.dart';
import 'package:inventory_sales_app/controllers/product_controller.dart';
import 'package:inventory_sales_app/routes/app_routes.dart';
import 'package:inventory_sales_app/utils/theme.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with TickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _fade;

  late final AuthController auth;
  late final ProductController products;

  @override
  void initState() {
    super.initState();
    // Ensure controllers are registered
    auth = Get.isRegistered<AuthController>()
        ? Get.find<AuthController>()
        : Get.put(AuthController(), permanent: true);
    products = Get.isRegistered<ProductController>()
        ? Get.find<ProductController>()
        : Get.put(ProductController(), permanent: true);

    _controller = AnimationController(vsync: this, duration: const Duration(milliseconds: 900))..forward();
    _fade = CurvedAnimation(parent: _controller, curve: Curves.easeIn);
    _init();
  }

  Future<void> _init() async {
    await products.loadProducts();
    await Future.delayed(const Duration(milliseconds: 800));
    if (auth.isAuthenticated.value) {
      Get.offAllNamed(AppRoutes.home);
    } else {
      Get.offAllNamed(AppRoutes.login);
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.primaryColor,
      body: FadeTransition(
        opacity: _fade,
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: const [
              Icon(Icons.shopping_cart, color: Colors.white, size: 80),
              SizedBox(height: 16),
              Text('Inventory Sales', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
              SizedBox(height: 12),
              CircularProgressIndicator(valueColor: AlwaysStoppedAnimation<Color>(Colors.white)),
            ],
          ),
        ),
      ),
    );
  }
}
