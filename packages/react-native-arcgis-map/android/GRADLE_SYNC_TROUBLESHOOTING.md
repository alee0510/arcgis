# Gradle Sync Troubleshooting for ArcGIS SDK

## Common Issues and Solutions

### 1. **Network/Repository Issues**

```
Could not resolve com.esri:arcgis-maps-kotlin:200.6.0
```

**Solutions:**

- Check internet connection
- Verify Esri repository URL is accessible
- Try using a VPN if corporate firewall blocks access
- Clear Gradle cache: `./gradlew clean` or delete `~/.gradle/caches/`

### 2. **Java/Kotlin Version Issues**

```
Unsupported class file major version
```

**Solutions:**

- Ensure Java 11+ is installed and selected in Android Studio
- Check Project Structure → SDK Location → JDK Location
- Verify `kotlinOptions.jvmTarget = '11'` in build.gradle

### 3. **Android Studio Not Recognizing Dependencies**

- File → Invalidate Caches and Restart
- Close project, delete `.idea` folder, reopen project
- Manually trigger sync: Tools → Android → Sync Project with Gradle Files

### 4. **MultiDex Issues**

```
Cannot fit requested classes in a single dex file
```

**Solutions:**

- Already configured in build.gradle with `multiDexEnabled true`
- If still issues, add to Application class: `MultiDex.install(this)`

### 5. **Dependency Version Conflicts**

- Check for version conflicts in Build → Analyze APK
- Use `./gradlew dependencies` to see dependency tree
- Consider using `implementation` instead of `api` for ArcGIS SDK

## Verification Commands

Run these in the Android directory to verify setup:

```bash
# Check if dependencies resolve
./gradlew dependencies

# Build the project
./gradlew build

# Clean build
./gradlew clean build
```

## Manual Gradle Sync

If Android Studio sync fails, try command line:

```bash
cd packages/react-native-arcgis-map/android
./gradlew build --refresh-dependencies
```

## ArcGIS SDK Version Check

Current version configured: `200.6.0`

Check for latest versions at:
https://developers.arcgis.com/kotlin/latest/release-notes/

## Network Configuration

If behind corporate firewall, you may need to configure proxy settings:

```gradle
systemProp.http.proxyHost=your-proxy-host
systemProp.http.proxyPort=your-proxy-port
systemProp.https.proxyHost=your-proxy-host
systemProp.https.proxyPort=your-proxy-port
```

Add to `gradle.properties` if needed.
