# Android Setup for ArcGIS Maps SDK 200.x

This document outlines the Android-specific setup for the ArcGIS Maps SDK 200.x integration.

## Prerequisites

- Android API Level 26 (Android 8.0) or higher
- Java 11 or higher
- Kotlin 2.0.21 or higher

## SDK Dependencies Added

The following dependencies have been configured:

```gradle
implementation 'com.esri:arcgis-maps-kotlin:200.6.0'
implementation 'androidx.multidex:multidex:2.0.1'
```

## Repository Configuration

The Esri Maven repository has been added:

```gradle
maven {
  url 'https://esri.jfrog.io/artifactory/arcgis'
}
```

## Permissions

The following permissions are included in the AndroidManifest.xml:

- `INTERNET` - For downloading map tiles and data
- `ACCESS_NETWORK_STATE` - To check connectivity
- `ACCESS_COARSE_LOCATION` - For location services
- `ACCESS_FINE_LOCATION` - For GPS location services
- `WRITE_EXTERNAL_STORAGE` - For offline maps and data
- `READ_EXTERNAL_STORAGE` - For reading offline data
- OpenGL ES 2.0 requirement

## Configuration Requirements for Consumer Apps

### 1. Application Class

In your main Android application, you'll need to initialize ArcGIS:

```kotlin
import com.arcgismap.ArcGISConfig

class MainApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        // Initialize ArcGIS with API key
        ArcGISConfig.initialize("YOUR_API_KEY_HERE")

        // OR use license string
        // ArcGISConfig.setLicense("YOUR_LICENSE_STRING_HERE")
    }
}
```

### 2. Multidex Support

If your app exceeds the 64K method limit, enable multidex in your app's `build.gradle`:

```gradle
android {
    defaultConfig {
        multiDexEnabled true
    }
}

dependencies {
    implementation 'androidx.multidex:multidex:2.0.1'
}
```

### 3. ProGuard Rules

The package includes ProGuard rules in `proguard-rules.pro`. If you're using code obfuscation, these rules will be automatically applied.

## Minimum SDK Requirements

- `minSdkVersion`: 26 (Android 8.0)
- `targetSdkVersion`: 34
- `compileSdkVersion`: 35
- Java/Kotlin compilation target: 11

## Build Configuration

The following build configurations are set:

- Multidex enabled
- Vector drawable support
- Java 11 source/target compatibility
- Kotlin JVM target 11
- Packaging options to handle native library conflicts

## Network Security

For production apps, consider adding network security configuration for HTTPS requirements and certificate pinning as per ArcGIS security best practices.

## Getting API Key

1. Go to [ArcGIS Developers](https://developers.arcgis.com/)
2. Sign in or create a free account
3. Go to your dashboard
4. Create a new API key or use an existing one
5. Configure the API key with appropriate privileges for your use case

## Next Steps

After this setup is complete, you can proceed with implementing the native Android code for the React Native bridge using the ArcGIS Maps SDK for Kotlin APIs.
