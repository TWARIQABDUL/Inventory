# Inventory Sales App

A Flutter mobile application for inventory management and sales, connected to a Spring Boot backend.

## Features

- **User Authentication**: Login and registration with Spring backend
- **Product Catalog**: Browse products with category filtering
- **Shopping Cart**: Add/remove items with quantity management
- **Product Details**: Detailed product information and stock status
- **User Profile**: User information and settings
- **Offline Support**: Fallback to dummy data when backend is unavailable

## Prerequisites

- Flutter SDK (3.0.0 or higher)
- Dart SDK
- Android Studio / VS Code
- Spring Boot backend running (see backend setup)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd mobile/inventory_sales_app
```

### 2. Install Dependencies

```bash
flutter pub get
```

### 3. Configure Backend URL

Open `lib/services/api_service.dart` and update the `baseUrl`:

```dart
// For Android Emulator (default)
static const String baseUrl = 'http://10.0.2.2:8080';

// For Physical Device (replace with your computer's IP)
static const String baseUrl = 'http://192.168.1.xxx:8080';

// For iOS Simulator
static const String baseUrl = 'http://localhost:8080';
```

### 4. Start the Spring Backend

Make sure your Spring Boot backend is running on port 8080. The backend should have the following endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/products` - Get all products
- `GET /api/category` - Get all categories

### 5. Run the App

```bash
# For Android
flutter run

# For iOS
flutter run -d ios

# For Web
flutter run -d chrome
```

## Project Structure

```
lib/
├── controllers/          # GetX controllers
│   ├── auth_controller.dart
│   ├── cart_controller.dart
│   └── product_controller.dart
├── models/              # Data models
│   ├── product.dart
│   └── cart_item.dart
├── screens/             # UI screens
│   ├── splash_screen.dart
│   ├── login_screen.dart
│   ├── register_screen.dart
│   ├── home_screen.dart
│   ├── product_detail_screen.dart
│   ├── cart_screen.dart
│   └── profile_screen.dart
├── services/            # API services
│   └── api_service.dart
├── utils/               # Utilities
│   └── theme.dart
├── widgets/             # Reusable widgets
│   ├── product_card.dart
│   ├── cart_item_card.dart
│   └── category_filter.dart
├── routes/              # App routing
│   └── app_routes.dart
└── main.dart           # App entry point
```

## Dependencies

- **get**: State management and routing
- **get_storage**: Local storage
- **http**: HTTP requests
- **intl**: Internationalization and formatting
- **cached_network_image**: Image caching
- **flutter_staggered_grid_view**: Grid layouts
- **shimmer**: Loading animations
- **flutter_svg**: SVG support

## Troubleshooting

### Connection Issues

1. **"Unable to connect to server" error**:
   - Check if the Spring backend is running
   - Verify the `baseUrl` in `api_service.dart`
   - For physical devices, ensure the device and computer are on the same network

2. **CORS errors** (web only):
   - Add CORS configuration to your Spring backend
   - Or use a CORS proxy for development

### Build Issues

1. **Android build fails**:
   ```bash
   flutter clean
   flutter pub get
   flutter run
   ```

2. **iOS build fails**:
   ```bash
   cd ios
   pod install
   cd ..
   flutter run
   ```

### API Response Issues

1. **Products not loading**:
   - Check the backend API response format
   - Verify the `Product.fromJson()` method matches your backend DTO
   - Check browser/device network tab for API errors

2. **Authentication fails**:
   - Verify login/register endpoint URLs
   - Check request/response format matches backend expectations

## Development Notes

### State Management

The app uses GetX for state management:
- `AuthController`: Handles user authentication state
- `ProductController`: Manages product data and filtering
- `CartController`: Handles shopping cart operations

### Error Handling

- Network errors show user-friendly messages
- Fallback to dummy data when API is unavailable
- Loading states for better UX
- Pull-to-refresh functionality

### Offline Support

When the backend is unavailable:
- Products load from dummy data
- Categories load from dummy data
- User can still browse and use the cart
- Error messages guide users to retry

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
