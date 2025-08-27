import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:inventory_sales_app/models/payment_model.dart';

class PaymentController extends GetxController {
  final paymentModel = PaymentModel().obs;
  final formKey = GlobalKey<FormState>();
  final phoneController = TextEditingController();
  final isLoading = false.obs;

  @override
  void onClose() {
    phoneController.dispose();
    super.onClose();
  }

  void onPhoneChanged(String value) {
    paymentModel.update((model) {
      model?.phoneNumber = value;
    });
  }

  Future<void> processPayment() async {
    if (formKey.currentState!.validate()) {
      isLoading.value = true;
      // Simulate payment processing
      await Future.delayed(const Duration(seconds: 2));
      isLoading.value = false;
      Get.snackbar(
        'Success',
        'Payment for ${paymentModel.value.phoneNumber} was successful!',
        snackPosition: SnackPosition.BOTTOM,
      );
    }
  }
}