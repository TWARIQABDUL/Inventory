class AppConfig {
  // Backend Configuration
  static const String baseUrl = 'http://192.168.100.47:8080';
  
  // Alternative URLs for different setups:
  // static const String baseUrl = 'http://10.0.2.2:8080'; // Android Emulator
  // static const String baseUrl = 'http://localhost:8080'; // iOS Simulator
  // static const String baseUrl = 'http://192.168.1.xxx:8080'; // Physical Device (replace xxx with your IP)
  
  // API Endpoints
  static const String loginEndpoint = '/api/auth/login';
  static const String registerEndpoint = '/api/auth/register';
  static const String productsEndpoint = '/api/products';
  static const String categoriesEndpoint = '/api/category';
  
  // Headers
  static Map<String, String> get headers => {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  // Timeout settings
  static const int connectionTimeout = 10000; // 10 seconds
  static const int receiveTimeout = 10000; // 10 seconds
}
