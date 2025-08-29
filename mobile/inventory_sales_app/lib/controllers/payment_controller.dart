import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:inventory_sales_app/controllers/cart_controller.dart';
// import 'package:inventory_sales_app/controllers/cart_controller.dart';
import 'package:inventory_sales_app/models/payment_model.dart';
import 'package:inventory_sales_app/services/notification_service.dart';

class PaymentController extends GetxController {
  // print("from cart controller ${}")
  final cart = CartController();
  final paymentModel = PaymentModel().obs;
  final formKey = GlobalKey<FormState>();
  final phoneController = TextEditingController();
  final isLoading = false.obs;
  final responseMess = "".obs;
  final RxBool isSuccesfull = false.obs;
  final showResponseBanner = false.obs;

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

  Future<Map<String, dynamic>> makeMpesaPayment(cartInfo) async {
    isLoading.value = true;
    // print("from payment we recieve ${cartInfo['orderId']}");
    // Map<String, dynamic> data
    String endpoint = "https://menu-server.tppc.tracom.dev/rpc/doMpesaCheckout";
    String saveTransactionUrl = "http://192.168.254.115:1010/api/transactions";

    final dio = Dio();

    if (formKey.currentState!.validate()) {}

    try {
      final response = await dio.post(
        endpoint,
        options: Options(headers: {
          'Content-Type': 'application/json',
        }),
        data: jsonEncode(
            {"amount": 1.0, "phoneNumber": paymentModel.value.phoneNumber}),
      );

      print("Succes Response ${response.data}");
      responseMess.value = response.data['message'];
      isSuccesfull.value = true;
      showResponseBanner.value = true;
      // isLoading.value = false;
      Future.delayed(const Duration(seconds: 3), () {
        showResponseBanner.value = false;
      });
// {amount: 1, message: The service request is processed successfully., rrn: THS5AHMYXJ, status: 0, transactionDate: 20250828101715, value: 254729534951}
      // save transaction
      try {
        final dateStr = response.data['transactionDate'].toString();
        String formattedDate;
        if (dateStr.length >= 14) {
          final year = int.parse(dateStr.substring(0, 4));
          final month = int.parse(dateStr.substring(4, 6));
          final day = int.parse(dateStr.substring(6, 8));
          final hour = int.parse(dateStr.substring(8, 10));
          final minute = int.parse(dateStr.substring(10, 12));
          final second = int.parse(dateStr.substring(12, 14));
          final parsedDate = DateTime(year, month, day, hour, minute, second);
          formattedDate =
              DateFormat("yyyy-MM-dd'T'HH:mm:ss").format(parsedDate);
        } else {
          // Fallback or error handling if the date format is not as expected
          // For now, we can use the original string, or a default/error value
          formattedDate = response.data['transactionDate'];
        }

        await dio.post(saveTransactionUrl,
            options: Options(headers: {
              'Content-Type': 'application/json',
            }),
            data: jsonEncode({
              "transactionCode": response.data['rrn'],
              "amount": cartInfo['totalAmount'],
              "createdAt": formattedDate,
              "description": "This is a test transaction Made by Mobile.",
              "order": {"orderId": cartInfo['orderId']},
              "user": {"userId": 1},
              "paymentMode": {"paymentModeId": 123}
            }));

        print("Transaction saved");
        isLoading.value = false;

        await NotificationService.showOrderStatus(
            message:
                "Payment of ${cartInfo['totalAmount']}  Success full with reference ${response.data['rrn']} at $formattedDate",
            isSucces: true);
        cart.clear();
      } catch (e) {
        await NotificationService.showOrderStatus(
            message: "Payment successful, but failed to save transaction.",
            isSucces: false);

        print("Transaction saved error: $e");
      }
      isLoading.value = false;
      return response.data;
    } catch (e) {
      isLoading.value = false;
      isSuccesfull.value = false;
      if (e is DioException) {
        print('Dio error: ${e.message}');
        if (e.response != null) {
          print('Response data: ${e.response?.data}');
          responseMess.value = e.response?.data['message'];
          showResponseBanner.value = true;
          await NotificationService.showOrderStatus(
              message: "Payment Failed: ${e.response?.data['message']}",
              isSucces: false);
          Future.delayed(const Duration(seconds: 3), () {
            showResponseBanner.value = false;
          });
          return e.response?.data;
        }
      }
      print('Error occurred: $e');
      await NotificationService.showOrderStatus(
          message: "Payment Failed due to an unexpected error.",
          isSucces: false);
      rethrow;
    }
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
