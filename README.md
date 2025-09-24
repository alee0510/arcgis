# ArcGIS Mobile Application

A React Native monorepo project for an ArcGIS-based mobile application with custom location services.

## 📱 Project Overview

This is a React Native application that integrates with ArcGIS services and includes a custom location management package. The project is structured as a monorepo using pnpm workspaces, containing both the main mobile application and a custom React Native TurboModule for location services.

## 🏗️ Project Structure

```bash
arcgis/
├── apps/
│   └── mobile/                      # Main React Native application
│       ├── src/                     # Application source code
│       │   ├── components/          # Reusable UI components
│       │   ├── hooks/              # Custom React hooks
│       │   ├── navigations/        # Navigation configuration
│       │   ├── screens/            # Application screens
│       │   ├── services/           # API services
│       │   ├── store/              # State management
│       │   ├── types/              # TypeScript type definitions
│       │   └── utils/              # Utility functions
│       ├── android/                # Android platform files
│       ├── ios/                    # iOS platform files
│       └── package.json
├── packages/
│   └── react-native-location/      # Custom location TurboModule
├── docs/                           # Project documentation
├── package.json                    # Root package.json
├── pnpm-workspace.yaml            # Workspace configuration
└── README.md
```

## 🛠️ Tech Stack

### Mobile Application

- **Framework**: React Native 0.79.6
- **Language**: TypeScript 5.0.4
- **Navigation**: React Navigation 7.x
- **State Management**: Zustand 5.x
- **Data Fetching**: TanStack Query 5.x
- **UI Components**: React Native Paper 5.x
- **Icons**: Lucide React Native & Material Design Icons

### Development Tools

- **Package Manager**: pnpm 10.15.1
- **Build Tool**: React Native CLI 18.0.0
- **Code Quality**: ESLint, Prettier
- **Architecture**: TurboModules (New Architecture)

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: >= 18.x
- **pnpm**: >= 10.15.1
- **React Native CLI**: 18.x
- **Java**: JDK 11 or higher (for Android)
- **Android Studio**: Latest stable version
- **Xcode**: 15.x or higher (for iOS, macOS only)
- **CocoaPods**: Latest version (for iOS, macOS only)

### Environment Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd arcgis
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Prepare the location package**

   ```bash
   pnpm run package:location:prepare
   ```

4. **iOS Setup** (macOS only)

   ```bash
   cd apps/mobile/ios
   bundle install
   bundle exec pod install
   cd ../../..
   ```

5. **Android Setup**
   - Open Android Studio
   - Configure Android SDK (API 34 recommended)
   - Create/start an Android Virtual Device

### 🏃‍♂️ Running the Application

#### Start Metro (JavaScript bundler)

```bash
pnpm run mobile:start:metro
```

#### Run on Android

```bash
pnpm run mobile:start:android-dev
```

#### Run on iOS

```bash
cd apps/mobile
pnpm run ios
```

## 📦 Available Scripts

### Root Level Scripts

- `pnpm run clean` - Remove all node_modules
- `pnpm run clean:mobile:android` - Clean Android build artifacts
- `pnpm run clean:mobile:gradle` - Clean Gradle cache
- `pnpm run clean:package:location` - Clean location package
- `pnpm run mobile:start:metro` - Start Metro bundler
- `pnpm run mobile:start:android-dev` - Build and run Android app
- `pnpm run mobile:android:codegen` - Generate Android codegen artifacts
- `pnpm run package:location:prepare` - Prepare location package

### Mobile App Scripts

- `pnpm run android` - Run Android app
- `pnpm run ios` - Run iOS app
- `pnpm run start` - Start Metro with cache reset
- `pnpm run lint` - Run ESLint

## 🔧 Development

### Project Architecture

The application follows a clean architecture pattern:

- **Components**: Reusable UI components
- **Hooks**: Custom React hooks for business logic
- **Services**: API communication layer
- **Store**: Global state management with Zustand
- **Utils**: Helper functions and utilities
- **Types**: TypeScript type definitions

### State Management

The app uses **Zustand** for state management with the following stores:

- Authentication state
- User preferences
- Location data

### Navigation

The app uses **React Navigation** with the following structure:

- `RootNavigation`: Main navigation container
- `AuthNavigation`: Authentication flow
- `MainNavigation`: Main app navigation
- Bottom tab navigation for primary screens

### Custom Location Package

The project includes a custom React Native TurboModule (`@arcgis/react-native-location`) for location services. See the [Location Package Documentation](./docs/LOCATION_README.md) for detailed usage instructions.

## 🧪 Testing

```bash
# Run tests for the location package
cd packages/react-native-location
pnpm test

# Run linting
pnpm run lint
```

## 📱 Platform-Specific Notes

### Android

- Minimum SDK: 21 (Android 5.0)
- Target SDK: 34 (Android 14)
- Uses Kotlin for native modules

### iOS

- Minimum iOS version: 13.0
- Uses Objective-C++ for native modules
- CocoaPods for dependency management

## 🚨 Troubleshooting

### Common Issues

1. **Metro bundler issues**

   ```bash
   pnpm run mobile:start:metro -- --reset-cache
   ```

2. **Android build failures**

   ```bash
   pnpm run clean:mobile:android
   pnpm run clean:mobile:gradle
   ```

3. **iOS build failures**

   ```bash
   cd apps/mobile/ios
   bundle exec pod install --repo-update
   ```

4. **Package linking issues**

   ```bash
   pnpm run clean
   pnpm install
   pnpm run package:location:prepare
   ```

### Performance Optimization

- Use Hermes JavaScript engine (enabled by default)
- Enable New Architecture (TurboModules/Fabric)
- Optimize bundle size with Metro configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Workflow

1. Make changes in the appropriate workspace
2. Test your changes locally
3. Run linting and tests
4. Update documentation if needed
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- **Ali Muksin** - _Initial work_ - [alee0510](https://github.com/alee0510)
- Email: <ali.muksin0510@gmail.com>

## 🔗 Related Documentation

- [Location Package Documentation](./docs/LOCATION_README.md)
- [React Native Documentation](https://reactnative.dev/)
- [ArcGIS SDK Documentation](https://developers.arcgis.com/)

---

### Built with ❤️ using React Native and TypeScript
