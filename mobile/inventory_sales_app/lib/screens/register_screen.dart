import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:inventory_sales_app/controllers/auth_controller.dart';
import 'package:inventory_sales_app/routes/app_routes.dart';
import 'package:inventory_sales_app/utils/theme.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final name = TextEditingController();
  final email = TextEditingController();
  final password = TextEditingController();
  final confirm = TextEditingController();
  late final AuthController auth;
  bool hide = true, hide2 = true;

  @override
  void initState() {
    super.initState();
    auth = Get.isRegistered<AuthController>()
        ? Get.find<AuthController>()
        : Get.put(AuthController(), permanent: true);
  }

  @override
  void dispose() {
    name.dispose();
    email.dispose();
    password.dispose();
    confirm.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    final ok = await auth.register(name.text.trim(), email.text.trim(), password.text);
    if (ok) {
      Get.offAllNamed(AppRoutes.home);
    } else {
      Get.snackbar('Error', 'Registration failed', snackPosition: SnackPosition.BOTTOM, backgroundColor: AppTheme.errorColor, colorText: Colors.white);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Create Account')),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: 8),
                const Text('Join Us', style: AppTheme.heading1, textAlign: TextAlign.center),
                const SizedBox(height: 24),
                TextFormField(
                  controller: name,
                  decoration: const InputDecoration(labelText: 'Full Name', prefixIcon: Icon(Icons.person_outline)),
                  validator: (v) => (v == null || v.length < 2) ? 'Enter your name' : null,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: email,
                  decoration: const InputDecoration(labelText: 'Email', prefixIcon: Icon(Icons.email_outlined)),
                  keyboardType: TextInputType.emailAddress,
                  validator: (v) => (v == null || !v.contains('@')) ? 'Invalid email' : null,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: password,
                  decoration: InputDecoration(
                    labelText: 'Password',
                    prefixIcon: const Icon(Icons.lock_outline),
                    suffixIcon: IconButton(
                      icon: Icon(hide ? Icons.visibility : Icons.visibility_off),
                      onPressed: () => setState(() => hide = !hide),
                    ),
                  ),
                  obscureText: hide,
                  validator: (v) => (v == null || v.length < 6) ? 'Min 6 chars' : null,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: confirm,
                  decoration: InputDecoration(
                    labelText: 'Confirm Password',
                    prefixIcon: const Icon(Icons.lock_outline),
                    suffixIcon: IconButton(
                      icon: Icon(hide2 ? Icons.visibility : Icons.visibility_off),
                      onPressed: () => setState(() => hide2 = !hide2),
                    ),
                  ),
                  obscureText: hide2,
                  validator: (v) => (v != password.text) ? 'Passwords do not match' : null,
                ),
                const SizedBox(height: 20),
                Obx(() => ElevatedButton(
                      onPressed: auth.isLoading.value ? null : _submit,
                      child: auth.isLoading.value
                          ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(strokeWidth: 2, valueColor: AlwaysStoppedAnimation<Color>(Colors.white)))
                          : const Text('Create Account'),
                    )),
                TextButton(
                  onPressed: () => Get.back(),
                  child: const Text('Already have an account? Sign In'),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
