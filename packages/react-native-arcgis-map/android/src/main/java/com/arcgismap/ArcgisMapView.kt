package com.arcgismap

import android.content.Context
import android.widget.FrameLayout
import android.util.Log
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments
import com.arcgismaps.mapping.view.MapView

class ArcgisMapView(context: Context): FrameLayout(context) {
    private var mapView: MapView = MapView(context)
    var mapId: String? = null
      set(value) {
        field = value
        value?.let { id ->
          val map = ArcgisMapModule.getMap(id)
          if (map != null) {
            mapView.map = map
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
        }
      }

    init {
      addView(mapView, LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT))
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

    fun getMapView(): MapView {
        return mapView
    }

    override fun onDetachedFromWindow() {
      super.onDetachedFromWindow()
      try {
        ArcgisMapModule.removeMap(mapId ?: "")
        removeView(mapView)
      } catch (e: Exception) {
        Log.e("ArcgisMapView", "Error during cleanup: ${e.message}")
      }
      Log.d("ArcgisMapView", "MapView cleaned up on unmount.")
    }
}
