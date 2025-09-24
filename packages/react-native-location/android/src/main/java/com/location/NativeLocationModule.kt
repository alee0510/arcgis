package com.location

import android.Manifest
import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.location.Location
import android.os.Looper
import androidx.core.app.ActivityCompat
import com.google.android.gms.location.*
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.PermissionListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.modules.core.PermissionAwareActivity
import com.facebook.react.modules.core.DeviceEventManagerModule

/**
 * React Native Location Module
 *
 * Provides location services with proper permission handling and GPS integration.
 * This module demonstrates enhanced code completion with proper imports and type annotations.
 */
class LocationModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext), ActivityEventListener {

  private val context: ReactApplicationContext = reactContext
  private var permissionPromise: Promise? = null
  private var fusedLocationClient: FusedLocationProviderClient
  private var locationCallback: LocationCallback? = null

  // Constants for location permissions and request codes
  companion object {
    const val NAME = "Location"
    private const val REQUEST_CODE_LOCATION = 1001
    private val REQUIRED_PERMISSIONS = arrayOf(
      Manifest.permission.ACCESS_FINE_LOCATION,
      Manifest.permission.ACCESS_COARSE_LOCATION
    )
  }

  init {
    context.addActivityEventListener(this)
    fusedLocationClient = LocationServices.getFusedLocationProviderClient(reactContext)
  }

  override fun getName(): String = NAME

  /**
   * Request location permissions from the user
   */
  @ReactMethod
  fun requestLocationPermission(promise: Promise) {
    val activity = currentActivity as? PermissionAwareActivity

    if (activity == null) {
      promise.reject("NO_ACTIVITY", "Activity doesn't exist")
      return
    }

    // Check if permissions are already granted
    if (hasLocationPermission()) {
      promise.resolve("granted")
      return
    }

    permissionPromise = promise
    activity.requestPermissions(
      REQUIRED_PERMISSIONS,
      REQUEST_CODE_LOCATION,
      createPermissionListener()
    )
  }

  /**
   * Get current location coordinates
   */
  @ReactMethod
  @SuppressLint("MissingPermission")
  fun getCurrentLocation(promise: Promise) {
    if (!hasLocationPermission()) {
      promise.reject("PERMISSION_DENIED", "Location permission not granted")
      return
    }

    fusedLocationClient.lastLocation
      .addOnSuccessListener { location: Location? ->
        if (location != null) {
          val locationMap = Arguments.createMap().apply {
            putDouble("latitude", location.latitude)
            putDouble("longitude", location.longitude)
            putDouble("accuracy", location.accuracy.toDouble())
            putDouble("altitude", location.altitude)
            putDouble("speed", location.speed.toDouble())
            putDouble("timestamp", location.time.toDouble())
          }
          promise.resolve(locationMap)
        } else {
          promise.reject("LOCATION_UNAVAILABLE", "Unable to get current location")
        }
      }
      .addOnFailureListener { exception: Exception ->
        promise.reject("LOCATION_ERROR", exception.message, exception)
      }
  }

  /**
   * Start watching location changes
   */
  @ReactMethod
  @SuppressLint("MissingPermission")
  fun startLocationWatch(intervalMs: Double, promise: Promise) {
    if (!hasLocationPermission()) {
      promise.reject("PERMISSION_DENIED", "Location permission not granted")
      return
    }

    val locationRequest = LocationRequest.create().apply {
      interval = intervalMs.toLong()
      fastestInterval = (intervalMs / 2).toLong()
      priority = LocationRequest.PRIORITY_HIGH_ACCURACY
    }

    locationCallback = object : LocationCallback() {
      override fun onLocationResult(locationResult: LocationResult) {
        locationResult.lastLocation?.let { location ->
          val params = Arguments.createMap().apply {
            putDouble("latitude", location.latitude)
            putDouble("longitude", location.longitude)
            putDouble("accuracy", location.accuracy.toDouble())
            putDouble("timestamp", location.time.toDouble())
          }

          // Send event to React Native
          context
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("LocationUpdate", params)
        }
      }
    }

    fusedLocationClient.requestLocationUpdates(
      locationRequest,
      locationCallback as LocationCallback,
      Looper.getMainLooper()
    )

    promise.resolve("Location watching started")
  }

  /**
   * Stop watching location changes
   */
  @ReactMethod
  fun stopLocationWatch(promise: Promise) {
    locationCallback?.let { callback ->
      fusedLocationClient.removeLocationUpdates(callback)
      locationCallback = null
      promise.resolve("Location watching stopped")
    } ?: promise.reject("NO_WATCH", "No location watch active")
  }

  /**
   * Check if location permissions are granted
   */
  private fun hasLocationPermission(): Boolean {
    return REQUIRED_PERMISSIONS.all { permission ->
      ActivityCompat.checkSelfPermission(context, permission) == PackageManager.PERMISSION_GRANTED
    }
  }

  /**
   * Create permission listener for handling permission results
   */
  private fun createPermissionListener(): PermissionListener {
    return object : PermissionListener {
      override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>,
        grantResults: IntArray
      ): Boolean {
        if (requestCode == REQUEST_CODE_LOCATION) {
          val granted = grantResults.isNotEmpty() &&
            grantResults.all { it == PackageManager.PERMISSION_GRANTED }

          permissionPromise?.resolve(if (granted) "granted" else "denied")
          permissionPromise = null
          return true
        }
        return false
      }
    }
  }

  // ActivityEventListener implementation
  override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, data: Intent?) {
    // Handle activity results if needed
  }

  override fun onNewIntent(intent: Intent?) {
    // Handle new intents if needed
  }

  override fun onCatalystInstanceDestroy() {
    super.onCatalystInstanceDestroy()
    locationCallback?.let { callback ->
      fusedLocationClient.removeLocationUpdates(callback)
    }
  }
}
