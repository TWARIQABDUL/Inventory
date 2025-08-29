import 'package:workmanager/workmanager.dart';
import 'notification_service.dart';

// The callback must be top-level
void callbackDispatcher() {
  Workmanager().executeTask((task, inputData) async {
    print("Background task triggered: $task");

    // Example: simulate spending calculation
    double currentSpending = 120;
    double dailyLimit = 100;
    double overageAmount = currentSpending - dailyLimit;

    if (currentSpending > dailyLimit) {
      await NotificationService.showSpendingAlertNotification(
        currentSpending: currentSpending,
        dailyLimit: dailyLimit,
        overageAmount: overageAmount,
      );
    }

    return Future.value(true);
  });
}

class BackgroundSyncService {
  static const String dailySyncTask = 'moneychat_daily_sync';

  static Future<void> initialize() async {
    await Workmanager().initialize(
      callbackDispatcher,
      isInDebugMode: true, // change to false in production
    );

    // Register immediately for demo
    await Workmanager().registerOneOffTask(
      'moneychat_daily_sync_task',
      'moneychat_daily_sync_task',
    );
  }

  static Future<void> scheduleDailySync() async {
    await Workmanager().cancelAll();

    await Workmanager().registerPeriodicTask(
      dailySyncTask,
      dailySyncTask,
      frequency: const Duration(days: 1),
      initialDelay: _calculateInitialDelay(),
    );
  }

  static Duration _calculateInitialDelay() {
    final now = DateTime.now();
    final scheduledTime =
        DateTime(now.year, now.month, now.day, 23, 59); // 11:59 PM

    if (now.isAfter(scheduledTime)) {
      return scheduledTime.add(const Duration(days: 1)).difference(now);
    }
    return scheduledTime.difference(now);
  }

  static Future<void> cancelDailySync() async {
    await Workmanager().cancelAll();
  }
}
