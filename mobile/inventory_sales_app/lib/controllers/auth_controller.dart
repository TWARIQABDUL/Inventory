import 'dart:convert';

import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:http/http.dart' as http;

class AuthController extends GetxController {
  final _storage = GetStorage();

  final isAuthenticated = false.obs;
  final userName = ''.obs;
  final userEmail = ''.obs;
  final isLoading = false.obs;

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
    const String link = "http://localhost:8080/api/auth/login";
    isLoading.value = true;
    try {
      final response = await http.post(
        Uri.parse(link),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'email': email,
          'password': password,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        isAuthenticated.value = true;
        userName.value = data['name']; 
        userEmail.value = data['email'];
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  Future<bool> register(String name, String email, String password) async {
    const String link = "http://localhost:8080/api/auth/register";
    isLoading.value = true;
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
        // Assuming registration also logs the user in
        final data = jsonDecode(response.body);
        isAuthenticated.value = true;
        userName.value = data['name'];
        userEmail.value = data['email'];
        _persist();
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  void logout() {
    isAuthenticated.value = false;
    userName.value = '';
    userEmail.value = '';
    _storage.erase();
  }
}