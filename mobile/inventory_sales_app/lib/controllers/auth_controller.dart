import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';

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
    isLoading.value = true;
    await Future.delayed(const Duration(milliseconds: 800));
    if (email == 'demo@example.com' && password == 'password') {
      isAuthenticated.value = true;
      userName.value = 'Demo User';
      userEmail.value = email;
      _persist();
      isLoading.value = false;
      return true;
    }
    isLoading.value = false;
    return false;
  }

  Future<bool> register(String name, String email, String password) async {
    isLoading.value = true;
    await Future.delayed(const Duration(milliseconds: 800));
    isAuthenticated.value = true;
    userName.value = name;
    userEmail.value = email;
    _persist();
    isLoading.value = false;
    return true;
  }

  void logout() {
    isAuthenticated.value = false;
    userName.value = '';
    userEmail.value = '';
    _storage.erase();
  }
}
