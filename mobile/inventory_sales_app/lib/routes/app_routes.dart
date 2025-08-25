import 'package:get/get.dart';
import 'package:inventory_sales_app/screens/splash_screen.dart';
import 'package:inventory_sales_app/screens/login_screen.dart';
import 'package:inventory_sales_app/screens/register_screen.dart';
import 'package:inventory_sales_app/screens/home_screen.dart';
import 'package:inventory_sales_app/screens/product_detail_screen.dart';
import 'package:inventory_sales_app/screens/cart_screen.dart';
import 'package:inventory_sales_app/screens/profile_screen.dart';

class AppRoutes {
  static const String splash = '/splash';
  static const String login = '/login';
  static const String register = '/register';
  static const String home = '/home';
  static const String productDetail = '/product-detail';
  static const String cart = '/cart';
  static const String profile = '/profile';

  static List<GetPage> get routes => [
    GetPage(name: splash, page: () => const SplashScreen()),
    GetPage(name: login, page: () => const LoginScreen()),
    GetPage(name: register, page: () => const RegisterScreen()),
    GetPage(name: home, page: () => const HomeScreen()),
    GetPage(name: productDetail, page: () => const ProductDetailScreen()),
    GetPage(name: cart, page: () => const CartScreen()),
    GetPage(name: profile, page: () => const ProfileScreen()),
  ];
}
