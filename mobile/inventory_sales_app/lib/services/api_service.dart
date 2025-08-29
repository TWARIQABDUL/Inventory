import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:inventory_sales_app/config/app_config.dart';

class ApiService {
  // Login
  static Future<Map<String, dynamic>> login(
      String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('${AppConfig.baseUrl}${AppConfig.loginEndpoint}'),
        headers: AppConfig.headers,
        body: jsonEncode({
          'email': email,
          'password': password,
        }),
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        final errorBody =
            response.body.isNotEmpty ? jsonDecode(response.body) : {};
        throw Exception(
            errorBody['message'] ?? 'Login failed: ${response.statusCode}');
      }
    } catch (e) {
      if (e.toString().contains('SocketException') ||
          e.toString().contains('Connection refused')) {
        throw Exception(
            'Unable to connect to server at ${AppConfig.baseUrl}. Please check:\n1. Spring backend is running\n2. Correct IP address and port\n3. Device and computer are on same network');
      }
      throw Exception('Network error: $e');
    }
  }

  // Register
  static Future<Map<String, dynamic>> register(
      String firstName, String lastName, String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('${AppConfig.baseUrl}${AppConfig.registerEndpoint}'),
        headers: AppConfig.headers,
        body: jsonEncode({
          'firstName': firstName,
          'lastName': lastName,
          'email': email,
          'password': password,
        }),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        return jsonDecode(response.body);
      } else {
        final errorBody =
            response.body.isNotEmpty ? jsonDecode(response.body) : {};
        throw Exception(errorBody['message'] ??
            'Registration failed: ${response.statusCode}');
      }
    } catch (e) {
      if (e.toString().contains('SocketException') ||
          e.toString().contains('Connection refused')) {
        throw Exception(
            'Unable to connect to server at ${AppConfig.baseUrl}. Please check:\n1. Spring backend is running\n2. Correct IP address and port\n3. Device and computer are on same network');
      }
      throw Exception('Network error: $e');
    }
  }

  // Get all products
  static Future<List<Map<String, dynamic>>> getProducts() async {
    try {
      final response = await http.get(
        Uri.parse('${AppConfig.baseUrl}${AppConfig.productsEndpoint}'),
        headers: AppConfig.headers,
      );

      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.cast<Map<String, dynamic>>();
      } else {
        final errorBody =
            response.body.isNotEmpty ? jsonDecode(response.body) : {};
        throw Exception(errorBody['message'] ??
            'Failed to load products: ${response.statusCode}');
      }
    } catch (e) {
      if (e.toString().contains('SocketException') ||
          e.toString().contains('Connection refused')) {
        throw Exception(
            'Unable to connect to server at ${AppConfig.baseUrl}. Please check:\n1. Spring backend is running\n2. Correct IP address and port\n3. Device and computer are on same network');
      }
      throw Exception('Network error: $e');
    }
  }

  // Get product by ID
  static Future<Map<String, dynamic>> getProductById(int productId) async {
    try {
      final response = await http.get(
        Uri.parse(
            '${AppConfig.baseUrl}${AppConfig.productsEndpoint}/$productId'),
        headers: AppConfig.headers,
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        final errorBody =
            response.body.isNotEmpty ? jsonDecode(response.body) : {};
        throw Exception(errorBody['message'] ??
            'Failed to load product: ${response.statusCode}');
      }
    } catch (e) {
      if (e.toString().contains('SocketException') ||
          e.toString().contains('Connection refused')) {
        throw Exception(
            'Unable to connect to server at ${AppConfig.baseUrl}. Please check:\n1. Spring backend is running\n2. Correct IP address and port\n3. Device and computer are on same network');
      }
      throw Exception('Network error: $e');
    }
  }

  // Get all categories
  static Future<List<Map<String, dynamic>>> getCategories() async {
    try {
      final response = await http.get(
        Uri.parse('${AppConfig.baseUrl}${AppConfig.categoriesEndpoint}'),
        headers: AppConfig.headers,
      );

      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.cast<Map<String, dynamic>>();
      } else {
        final errorBody =
            response.body.isNotEmpty ? jsonDecode(response.body) : {};
        throw Exception(errorBody['message'] ??
            'Failed to load categories: ${response.statusCode}');
      }
    } catch (e) {
      if (e.toString().contains('SocketException') ||
          e.toString().contains('Connection refused')) {
        throw Exception(
            'Unable to connect to server at ${AppConfig.baseUrl}. Please check:\n1. Spring backend is running\n2. Correct IP address and port\n3. Device and computer are on same network');
      }
      throw Exception('Network error: $e');
    }
  }
}
