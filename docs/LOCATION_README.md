# React Native Location Package

A custom React Native TurboModule for handling location permissions and retrieving location data in the ArcGIS mobile application.

## 📋 Overview

`@arcgis/react-native-location` is a high-performance React Native TurboModule that provides seamless location services integration for both iOS and Android platforms. Built with the new React Native architecture, it offers type-safe APIs and optimized performance.

## ✨ Features

- 🚀 **TurboModule Architecture**: Built with React Native's new architecture for optimal performance
- 🔒 **Permission Management**: Seamless location permission handling
- 📍 **Current Location**: Get precise current location data
- 🎯 **High Accuracy**: Configurable accuracy settings
- 📱 **Cross-Platform**: Full iOS and Android support
- 🔧 **TypeScript**: Full type safety and IntelliSense support
- ⚡ **Async/Await**: Modern promise-based API

## 📦 Installation

This package is included as a workspace dependency in the monorepo. No separate installation is required.

### For External Projects

If you want to use this package in other projects:

```bash
npm install @arcgis/react-native-location
# or
yarn add @arcgis/react-native-location
# or
pnpm add @arcgis/react-native-location
```

### iOS Setup

Add location permissions to your `Info.plist`:

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>This app needs access to your location to provide location-based features.</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>This app needs access to your location to provide location-based features.</string>
```

### Android Setup

Add location permissions to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

## 🚀 Usage

### Basic Implementation

```typescript
import Location, { LocationResult } from "@arcgis/react-native-location";

// Check if location permission is granted
const hasPermission = await Location.hasLocationPermission();
console.log("Has permission:", hasPermission);

// Request location permission
const permissionGranted = await Location.requestLocationPermission();
console.log("Permission granted:", permissionGranted);

// Get current location
try {
  const location: LocationResult = await Location.getCurrentLocation();
  console.log("Current location:", location);
} catch (error) {
  console.error("Failed to get location:", error);
}
```

### React Hook Implementation

```typescript
import { useState, useEffect } from "react";
import Location, { LocationResult } from "@arcgis/react-native-location";

export const useLocation = () => {
  const [location, setLocation] = useState<LocationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check permission first
      const hasPermission = await Location.hasLocationPermission();
      if (!hasPermission) {
        const granted = await Location.requestLocationPermission();
        if (!granted) {
          throw new Error("Location permission denied");
        }
      }

      // Get location
      const locationData = await Location.getCurrentLocation();
      setLocation(locationData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return {
    location,
    loading,
    error,
    refetch: getCurrentLocation,
  };
};
```

### Component Usage Example

```typescript
import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import Location from '@arcgis/react-native-location';

const LocationScreen: React.FC = () => {
  const [location, setLocation] = useState<LocationResult | null>(null);

  const handleGetLocation = async () => {
    try {
      // Request permission
      const hasPermission = await Location.hasLocationPermission();
      if (!hasPermission) {
        const granted = await Location.requestLocationPermission();
        if (!granted) {
          Alert.alert('Permission Denied', 'Location permission is required');
          return;
        }
      }

      // Get current location
      const currentLocation = await Location.getCurrentLocation();
      setLocation(currentLocation);

      Alert.alert(
        'Location Retrieved',
        `Lat: ${currentLocation.latitude}, Lng: ${currentLocation.longitude}`
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to get location');
      console.error(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Get Current Location" onPress={handleGetLocation} />

      {location && (
        <View style={{ marginTop: 20 }}>
          <Text>Latitude: {location.latitude}</Text>
          <Text>Longitude: {location.longitude}</Text>
          <Text>Accuracy: {location.accuracy}m</Text>
          {location.altitude && <Text>Altitude: {location.altitude}m</Text>}
          {location.speed && <Text>Speed: {location.speed} m/s</Text>}
          {location.heading && <Text>Heading: {location.heading}°</Text>}
          <Text>Timestamp: {new Date(location.timestamp).toLocaleString()}</Text>
        </View>
      )}
    </View>
  );
};

export default LocationScreen;
```

## 📚 API Reference

### Location Class

#### Static Methods

##### `requestLocationPermission(): Promise<boolean>`

Requests location permission from the user.

**Returns**: `Promise<boolean>` - `true` if permission granted, `false` otherwise

**Example**:

```typescript
const granted = await Location.requestLocationPermission();
```

##### `hasLocationPermission(): Promise<boolean>`

Checks if location permission is currently granted.

**Returns**: `Promise<boolean>` - `true` if permission is granted, `false` otherwise

**Example**:

```typescript
const hasPermission = await Location.hasLocationPermission();
```

##### `getCurrentLocation(): Promise<LocationResult>`

Gets the current device location.

**Returns**: `Promise<LocationResult>` - Current location data

**Throws**: Error if location cannot be retrieved or permission is denied

**Example**:

```typescript
try {
  const location = await Location.getCurrentLocation();
  console.log(location);
} catch (error) {
  console.error("Location error:", error);
}
```

### Types

#### LocationResult

```typescript
interface LocationResult {
  latitude: number; // Latitude in degrees
  longitude: number; // Longitude in degrees
  accuracy: number; // Accuracy in meters
  altitude?: number; // Altitude in meters (optional)
  heading?: number; // Heading in degrees (0-360, optional)
  speed?: number; // Speed in m/s (optional)
  timestamp: number; // Unix timestamp in milliseconds
}
```

## 🔧 Configuration

### iOS Configuration

The module uses `CLLocationManager` with the following settings:

- Desired accuracy: `kCLLocationAccuracyBest`
- Distance filter: None (gets all updates)
- Timeout: 15 seconds

### Android Configuration

The module uses `FusedLocationProviderClient` with:

- Priority: `PRIORITY_HIGH_ACCURACY`
- Timeout: 15 seconds
- Maximum age: 30 seconds

## ⚠️ Error Handling

Common errors and how to handle them:

```typescript
try {
  const location = await Location.getCurrentLocation();
} catch (error) {
  if (error.message.includes("Permission")) {
    // Handle permission denied
    console.log("Location permission denied");
  } else if (error.message.includes("timeout")) {
    // Handle timeout
    console.log("Location request timed out");
  } else if (error.message.includes("unavailable")) {
    // Handle location services disabled
    console.log("Location services unavailable");
  } else {
    // Handle other errors
    console.log("Unknown location error:", error.message);
  }
}
```

## 🔍 Best Practices

### 1. Permission Handling

```typescript
// Always check permission before requesting location
const checkAndRequestPermission = async (): Promise<boolean> => {
  const hasPermission = await Location.hasLocationPermission();
  if (hasPermission) return true;

  return await Location.requestLocationPermission();
};
```

### 2. Error Boundaries

```typescript
const LocationWrapper: React.FC = ({ children }) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const granted = await Location.hasLocationPermission();
        setHasPermission(granted);
      } catch (error) {
        console.error('Permission check failed:', error);
      }
    };

    checkPermission();
  }, []);

  if (!hasPermission) {
    return <PermissionScreen onPermissionGranted={() => setHasPermission(true)} />;
  }

  return <>{children}</>;
};
```

### 3. Caching Location Data

```typescript
import AsyncStorage from "@react-native-async-storage/async-storage";

const LOCATION_CACHE_KEY = "last_known_location";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCachedOrCurrentLocation = async (): Promise<LocationResult> => {
  try {
    // Try to get cached location first
    const cached = await AsyncStorage.getItem(LOCATION_CACHE_KEY);
    if (cached) {
      const { location, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return location;
      }
    }

    // Get fresh location
    const location = await Location.getCurrentLocation();

    // Cache the result
    await AsyncStorage.setItem(
      LOCATION_CACHE_KEY,
      JSON.stringify({
        location,
        timestamp: Date.now(),
      })
    );

    return location;
  } catch (error) {
    // If fresh location fails, return cached if available
    const cached = await AsyncStorage.getItem(LOCATION_CACHE_KEY);
    if (cached) {
      const { location } = JSON.parse(cached);
      return location;
    }
    throw error;
  }
};
```

## 🧪 Testing

### Unit Tests

```typescript
// __tests__/location.test.ts
import Location from "@arcgis/react-native-location";

// Mock the native module
jest.mock("@arcgis/react-native-location", () => ({
  requestLocationPermission: jest.fn(),
  hasLocationPermission: jest.fn(),
  getCurrentLocation: jest.fn(),
}));

describe("Location Module", () => {
  it("should request permission successfully", async () => {
    const mockRequestPermission =
      Location.requestLocationPermission as jest.Mock;
    mockRequestPermission.mockResolvedValue(true);

    const result = await Location.requestLocationPermission();
    expect(result).toBe(true);
    expect(mockRequestPermission).toHaveBeenCalledTimes(1);
  });

  it("should get current location", async () => {
    const mockLocation = {
      latitude: 37.7749,
      longitude: -122.4194,
      accuracy: 5,
      timestamp: Date.now(),
    };

    const mockGetCurrentLocation = Location.getCurrentLocation as jest.Mock;
    mockGetCurrentLocation.mockResolvedValue(mockLocation);

    const result = await Location.getCurrentLocation();
    expect(result).toEqual(mockLocation);
  });
});
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Module not found error

```bash
# Clean and reinstall
cd packages/react-native-location
pnpm run clean
pnpm run prepare

# In the root directory
pnpm run package:location:prepare
```

#### 2. iOS build errors

```bash
cd apps/mobile/ios
bundle exec pod install
```

#### 3. Android build errors

```bash
cd apps/mobile/android
./gradlew clean
```

#### 4. Permission issues on Android

Make sure location services are enabled in device settings and the app has location permissions.

#### 5. Location timeout

```typescript
// Implement retry logic
const getLocationWithRetry = async (
  maxRetries = 3
): Promise<LocationResult> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await Location.getCurrentLocation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
    }
  }
  throw new Error("Max retries exceeded");
};
```

## 📈 Performance Tips

1. **Cache location data** to avoid unnecessary native calls
2. **Request permissions early** in the app lifecycle
3. **Use appropriate accuracy settings** for your use case
4. **Implement proper error handling** to gracefully handle failures
5. **Consider user privacy** and only request location when needed

## 🔗 Related Links

- [React Native Geolocation](https://reactnative.dev/docs/geolocation)
- [iOS Core Location](https://developer.apple.com/documentation/corelocation)
- [Android Location Services](https://developer.android.com/training/location)
- [React Native TurboModules](https://reactnative.dev/docs/the-new-architecture/pillars-turbomodules)

## 📄 License

MIT License - see the [LICENSE](../packages/react-native-location/LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make changes in `packages/react-native-location/`
4. Test your changes thoroughly
5. Update documentation
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

---

## Built with ❤️ for the ArcGIS Mobile Application
