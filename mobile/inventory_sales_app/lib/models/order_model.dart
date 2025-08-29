class Order {
  final String id;
  final DateTime date;
  final double total;
  final String status;
  final List<String> items; // Simplified for now

  Order({
    required this.id,
    required this.date,
    required this.total,
    required this.status,
    required this.items,
  });
}