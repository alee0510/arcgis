package com.arcgismap

import android.content.Context
import android.widget.FrameLayout
import android.util.Log
import androidx.lifecycle.LifecycleOwner
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments
import com.arcgismaps.mapping.view.MapView

class ArcgisMapView(context: Context): FrameLayout(context) {
    private var mapView: MapView? = null
    private var isMapViewInitialized = false
    var mapId: String? = null
      set(value) {
        field = value
        value?.let { id ->
          initializeMapViewSafely(id)
        }
      }

    init {
      // Don't initialize MapView immediately, wait for proper lifecycle setup
      post {
        setupMapView()
      }
    }

    private fun setupMapView() {
      try {
        if (mapView == null && !isMapViewInitialized) {
          // Ensure we have a proper lifecycle owner
          val lifecycleOwner = getLifecycleOwner()
          if (lifecycleOwner != null) {
            mapView = MapView(context)
            addView(mapView, LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT))
            isMapViewInitialized = true

            // If mapId was set before MapView was ready, initialize it now
            mapId?.let { id ->
              initializeMapViewSafely(id)
            }
          } else {
            Log.w("ArcgisMapView", "Lifecycle owner not available, retrying in 100ms")
            postDelayed({ setupMapView() }, 100)
          }
        }
      } catch (e: Exception) {
        Log.e("ArcgisMapView", "Error setting up MapView: ${e.message}", e)
        val errorMessage = "Failed to initialize MapView: ${e.message}"
        val payload = Arguments.createMap().apply {
          putString("error", errorMessage)
          putString("mapId", mapId)
        }
        emitEvent(EventName.ON_ERROR, payload)
      }
    }

    private fun initializeMapViewSafely(id: String) {
      try {
        if (mapView != null && isMapViewInitialized) {
          val map = ArcgisMapModule.getMap(id)
          if (map != null) {
            mapView?.map = map
            val payload = Arguments.createMap().apply {
              putString("message", "Map is ready")
              putString("mapId", id)
            }
            emitEvent(EventName.ON_READY, payload)
          } else {
            val errorMessage = "No map found with id $id."
            val payload = Arguments.createMap().apply {
              putString("error", errorMessage)
              putString("mapId", id)
            }
            emitEvent(EventName.ON_ERROR, payload)
          }
        } else {
          // MapView not ready yet, wait and retry
          post {
            initializeMapViewSafely(id)
          }
        }
      } catch (e: Exception) {
        Log.e("ArcgisMapView", "Error initializing map with id $id: ${e.message}", e)
        val errorMessage = "Failed to initialize map: ${e.message}"
        val payload = Arguments.createMap().apply {
          putString("error", errorMessage)
          putString("mapId", id)
        }
        emitEvent(EventName.ON_ERROR, payload)
      }
    }

    private fun getLifecycleOwner(): LifecycleOwner? {
      return try {
        val reactContext = context as? ReactContext
        val currentActivity = reactContext?.currentActivity as? FragmentActivity
        currentActivity
      } catch (e: Exception) {
        Log.w("ArcgisMapView", "Could not get lifecycle owner: ${e.message}")
        null
      }
    }

    private fun emitEvent(eventName: EventName, payload: WritableMap) {
      val reactContext = context as ReactContext
      val surfaceId = UIManagerHelper.getSurfaceId(reactContext)
      val eventDispatcher = UIManagerHelper.getEventDispatcher(reactContext, surfaceId)
      try {
        requireNotNull(surfaceId) { "Surface ID is null" }
        requireNotNull(eventDispatcher) { "Event Dispatcher is null" }

        if (!EventName.entries.contains(eventName)) {
          throw IllegalArgumentException("Unknown event name: ${eventName.value}")
        }

        val event = when (eventName) {
          EventName.ON_READY -> OnReadyEvent(surfaceId, this.id, payload)
          EventName.ON_ERROR -> OnErrorEvent(surfaceId, this.id, payload)
        }

        eventDispatcher.dispatchEvent(event)
        Log.d("ArcgisMapView", "Event ${eventName.value} emitted.")
      } catch (e: IllegalArgumentException) {
        Log.e("ArcgisMapView", "Cannot emit event: ${e.message}")
      }
    }

    private enum class EventName(val value: String) {
      ON_READY("onReady"),
      ON_ERROR("onError")
    }

    fun getMapView(): MapView? {
        return mapView
    }

    override fun onDetachedFromWindow() {
      super.onDetachedFromWindow()
      try {
        ArcgisMapModule.removeMap(mapId ?: "")
        mapView?.let { mv ->
          removeView(mv)
          // In ArcGIS Maps SDK 200.x, MapView cleanup is handled automatically
          // No dispose() method is needed
        }
        mapView = null
        isMapViewInitialized = false
      } catch (e: Exception) {
        Log.e("ArcgisMapView", "Error during cleanup: ${e.message}")
      }
      Log.d("ArcgisMapView", "MapView cleaned up on unmount.")
    }
}
