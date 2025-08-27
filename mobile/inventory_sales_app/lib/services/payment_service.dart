// import 'package:flutter_mpesa_stk/flutter_mpesa_stk.dart';
// import 'package:flutter_mpesa_stk/models/Mpesa.dart';
// import 'package:flutter_mpesa_stk/models/MpesaResponse.dart';

// class PaymentService {
//   Future<Map<String, dynamic>> makeMpesaPayment(Map<String, dynamic> data) async {
//   String endpoint = "https://menu-server.tppc.tracom.dev/rpc/doMpesaCheckout";

//   final dio = Dio();

//   try {
//     final response = await dio.post(
//       endpoint,
//       options: Options(headers: {
//         'Content-Type': 'application/json',
//       }),
//       data: data,
//     );

//       return response.data;

//   } catch (e) {
//     if(e is DioException) {
//       print('Dio error: ${e.message}');
//       if (e.response != null) {
//         print('Response data: ${e.response?.data}');
//         return e.response?.data;
//       }
//     }
//     print('Error occurred: $e');
//     rethrow;
//   }
// }
// }
