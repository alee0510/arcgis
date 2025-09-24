package com.location

import android.Manifest
import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.location.Location
import androidx.core.app.ActivityCompat
import com.google.android.gms.location.*
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.PermissionListener
import com.facebook.react.modules.core.PermissionAwareActivity

class LocationModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), ActivityEventListener {
  // React application context
  private val context: ReactApplicationContext = reactContext
  private var permissionPromise: Promise? = null
  private var fusedLocationClient: FusedLocationProviderClient
  private var locationCallback: LocationCallback? = null

  // Constants for location permissions and request codes
  companion object {
    const val NAME = "LocationModule"
    private const val REQUEST_CODE_LOCATION = 1001
    private val REQUIRED_PERMISSIONS = arrayOf(
      Manifest.permission.ACCESS_FINE_LOCATION,
      Manifest.permission.ACCESS_COARSE_LOCATION
    )
  }

  // Initializer block to set up the location client and activity listener
  init {
    context.addActivityEventListener(this)
    fusedLocationClient = LocationServices.getFusedLocationProviderClient(reactContext)
  }

  // Module name for React Native
  override fun getName(): String = NAME

  // Method to request location permissions
  @ReactMethod
  fun requestLocationPermission(promise: Promise) {
    val activity = currentActivity as? PermissionAwareActivity

    if (activity == null) {
      promise.reject("NO_ACTIVITY", "Activity doesn't exist")
      return
    }

    if (hasLocationPermission()) {
      promise.resolve(true)
      return
    }

    permissionPromise = promise
    activity.requestPermissions(
      REQUIRED_PERMISSIONS,
      REQUEST_CODE_LOCATION,
      createPermissionListener()
    )
  }

  // Method to check if location permission is granted
  @ReactMethod
  fun hasLocationPermission(promise: Promise) {
    val hasPermission = REQUIRED_PERMISSIONS.all { permission ->
      ActivityCompat.checkSelfPermission(context, permission) == PackageManager.PERMISSION_GRANTED
    }
    promise.resolve(hasPermission)
  }

  // Method to start location updates
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

  // Private helper method to check location permissions
  private fun hasLocationPermission(): Boolean {
    return REQUIRED_PERMISSIONS.all { permission ->
      ActivityCompat.checkSelfPermission(context, permission) == PackageManager.PERMISSION_GRANTED
    }
  }

  // Method to handle permission results
  private fun createPermissionListener(): PermissionListener {
    return object : PermissionListener {
      override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>,
        grantResults: IntArray
      ): Boolean {
        if (requestCode == REQUEST_CODE_LOCATION) {
          val granted = grantResults.isNotEmpty() && grantResults.all { it == PackageManager.PERMISSION_GRANTED }
          permissionPromise?.resolve(granted)
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
    locationCallback?.let { callback ->
      fusedLocationClient.removeLocationUpdates(callback)
    }
  }
}
