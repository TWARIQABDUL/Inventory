import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:inventory_sales_app/controllers/payment_controller.dart';
import 'package:inventory_sales_app/utils/theme.dart';

class PaymentScreen extends GetView<PaymentController> {
  const PaymentScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final respArgs = Get.arguments;
    // print(respArgs['totalAmount']);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Payment'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: controller.formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Obx(() => Visibility(
                    visible: controller.showResponseBanner.value,
                    child: Container(
                      padding: const EdgeInsets.all(8.0),
                      color: controller.isSuccesfull.value
                          ? Colors.greenAccent[700]
                          : const Color.fromARGB(255, 209, 70, 70),
                      child: Text(
                        controller.responseMess.value,
                        style: const TextStyle(
                            // backgroundColor:
                            color: Colors.white),
                      ),
                    ),
                  )),
              const Text(
                'Enter your M-Pesa phone number to pay:',
                style: AppTheme.body1,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              Text(
                'KES',
                style: AppTheme.heading3.copyWith(color: AppTheme.primaryColor),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 24),
              TextFormField(
                controller: controller.phoneController,
                decoration: const InputDecoration(
                  labelText: 'Phone Number',
                  hintText: 'e.g. 0712345678',
                  prefixIcon: Icon(Icons.phone),
                ),
                keyboardType: TextInputType.number,
                inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a phone number';
                  }
                  return null;
                },
                onChanged: controller.onPhoneChanged,
              ),
              const SizedBox(height: 32),
              Obx(() => ElevatedButton(
                    onPressed: () => {
                      controller.isLoading.value? null
                      :controller.makeMpesaPayment(respArgs)

                      },
                    child: controller.isLoading.value
                        ? const CircularProgressIndicator(color: Colors.white)
                        : const Text('Pay Now'),
                  )),
            ],
          ),
        ),
      ),
    );
  }
}
