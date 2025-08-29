import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:permission_handler/permission_handler.dart';

class NotificationService {
  static final FlutterLocalNotificationsPlugin _notifications =
      FlutterLocalNotificationsPlugin();

  static const String _channelId = 'spending_alerts';
  static const String _channelName = 'Spending Alerts';
  static const String _channelDescription =
      'Alerts when spending limits are exceeded';

  static const int _spendingProgressNotificationId = 1001;

  // Initialize notification service
  static Future<void> initialize() async {
    await _requestPermissions();

    const AndroidInitializationSettings androidSettings =
        AndroidInitializationSettings('@mipmap/ic_launcher');

    const DarwinInitializationSettings iosSettings =
        DarwinInitializationSettings(
      requestAlertPermission: true,
      requestBadgePermission: true,
      requestSoundPermission: true,
    );

    const InitializationSettings initSettings =
        InitializationSettings(android: androidSettings, iOS: iosSettings);

    await _notifications.initialize(
      initSettings,
      onDidReceiveNotificationResponse: _onNotificationTapped,
    );

    if (Platform.isAndroid) {
      await _createNotificationChannel();
    }
  }

  // Request notification permissions
  static Future<void> _requestPermissions() async {
    if (Platform.isAndroid) {
      final status = await Permission.notification.request();
      if (status.isDenied) {
        debugPrint('Notification permission denied');
      }
    } else {
      await _notifications
          .resolvePlatformSpecificImplementation<
              IOSFlutterLocalNotificationsPlugin>()
          ?.requestPermissions(
            alert: true,
            badge: true,
            sound: true,
          );
    }
  }

  // Create notification channel for Android
  static Future<void> _createNotificationChannel() async {
    const AndroidNotificationChannel channel = AndroidNotificationChannel(
      _channelId,
      _channelName,
      description: _channelDescription,
      importance: Importance.high,
    );

    await _notifications
        .resolvePlatformSpecificImplementation<
            AndroidFlutterLocalNotificationsPlugin>()
        ?.createNotificationChannel(channel);
  }

  // Show spending alert
  static Future<void> showSpendingAlertNotification({
    required double currentSpending,
    required double dailyLimit,
    required double overageAmount,
  }) async {
    const title = '⚠️ Daily Limit Exceeded!';
    final body =
        'You\'ve spent ${_formatCurrency(currentSpending)} (${_formatCurrency(overageAmount)} over limit)';

    const androidDetails = AndroidNotificationDetails(
      _channelId,
      _channelName,
      channelDescription: _channelDescription,
      importance: Importance.high,
      priority: Priority.high,
      color: Color(0xFFE53E3E),
      colorized: true,
    );

    const iosDetails = DarwinNotificationDetails(
      presentAlert: true,
      presentBadge: true,
      presentSound: true,
    );

    const details =
        NotificationDetails(android: androidDetails, iOS: iosDetails);

    await _notifications.show(
      _spendingProgressNotificationId,
      title,
      body,
      details,
      payload: 'spending_alert',
    );
  }

  // order status notification
  static Future<void> showOrderStatus({
    required String message,
    required final bool isSucces,
  }) async {
    final title = isSucces ? "Payment Successfull" : "Payment Failed";
    final body = message;
    final androidDetails = AndroidNotificationDetails(
      _channelId,
      _channelName,
      channelDescription: _channelDescription,
      importance: Importance.high,
      priority: Priority.high,
      color: isSucces ? Colors.green.shade300 : Colors.red.shade400,
      colorized: true,
    );

    const iosDetails = DarwinNotificationDetails(
      presentAlert: true,
      presentBadge: true,
      presentSound: true,
    );

    final details =
        NotificationDetails(android: androidDetails, iOS: iosDetails);

    await _notifications.show(
      _spendingProgressNotificationId,
      title,
      body,
      details,
      payload: 'spending_alert',
    );
  }

  // Handle taps
  static void _onNotificationTapped(NotificationResponse response) {
    if (response.payload == 'spending_alert') {
      debugPrint("User tapped spending alert!");
      // TODO: Navigate to spending screen
    }
  }

  static String _formatCurrency(double amount) {
    return "${amount.toStringAsFixed(2)}";
  }
}
