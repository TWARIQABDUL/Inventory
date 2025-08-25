import 'dart:convert';

import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:inventory_sales_app/services/api_service.dart';

class AuthController extends GetxController {
  final _storage = GetStorage();

  final isAuthenticated = false.obs;
  final userName = ''.obs;
  final userEmail = ''.obs;
  final isLoading = false.obs;
  final errorMessage = ''.obs;

  @override
  void onInit() {
    super.onInit();
    isAuthenticated.value = _storage.read('isAuthenticated') ?? false;
    userName.value = _storage.read('userName') ?? '';
    userEmail.value = _storage.read('userEmail') ?? '';
  }

  void _persist() {
    _storage.write('isAuthenticated', isAuthenticated.value);
    _storage.write('userName', userName.value);
    _storage.write('userEmail', userEmail.value);
  }

  Future<bool> login(String email, String password) async {
    print("Loging In");
    const String link = "http://192.168.254.115:1010/api/auth/login";
    isLoading.value = true;
    errorMessage.value = '';
    
    try {
      final response = await ApiService.login(email, password);
      
      if (response['status'] == true) {
        isAuthenticated.value = true;
        userName.value = data['name'];
        userEmail.value = data['email'];
        return true;
      } else {
        errorMessage.value = response['message'] ?? 'Login failed';
        isLoading.value = false;
        return false;
      }
    } catch (e) {
      print("Error Happen $e");
      return false;
    } finally {
      isLoading.value = false;
      return false;
    }
  }

  Future<bool> register(String name, String email, String password) async {
    const String link = "http://localhost:8080/api/auth/register";
    print("Loging in");
    isLoading.value = true;
    errorMessage.value = '';
    
    try {
      final response = await http.post(
        Uri.parse(link),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'name': name,
          'email': email,
          'password': password,
        }),
      );

      if (response.statusCode == 201 || response.statusCode == 200) {
        final data = jsonDecode(response.body);
        isAuthenticated.value = true;
        userName.value = '$firstName $lastName';
        userEmail.value = email;
        _persist();
        isLoading.value = false;
        return true;
      } else {
        errorMessage.value = response['message'] ?? 'Registration failed';
        isLoading.value = false;
        return false;
      }
    } catch (e) {
      errorMessage.value = e.toString();
      isLoading.value = false;
      return false;
    }
  }

  void logout() {
    isAuthenticated.value = false;
    userName.value = '';
    userEmail.value = '';
    errorMessage.value = '';
    _storage.erase();
  }

  void clearError() {
    errorMessage.value = '';
  }
}
