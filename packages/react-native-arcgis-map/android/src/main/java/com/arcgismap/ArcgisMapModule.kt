package com.arcgismap

import com.facebook.react.bridge.*
import com.arcgismaps.mapping.ArcGISMap
import com.arcgismaps.mapping.BasemapStyle
import com.arcgismaps.mapping.Viewpoint
import com.arcgismapspec.NativeArcgisMapModuleSpec
import java.util.concurrent.ConcurrentHashMap

class ArcgisMapModule(reactContext: ReactApplicationContext) : NativeArcgisMapModuleSpec(reactContext) {
  @ReactMethod
  override fun createMap(mapId: String?, basemapStyle: String?, promise: Promise?) {
    try {
      if (mapId == null || mapId.isEmpty()) {
        promise?.reject("INVALID_MAP_ID", "Map ID cannot be null or empty")
        return
      }

      if (getMap(mapId) != null) {
        promise?.reject("DUPLICATE_MAP_ID", "A map with the provided ID already exists")
        return
      }

      if (basemapStyle == null) {
        promise?.reject("INVALID_BASEMAP_STYLE", "Unrecognized or null basemap style: $basemapStyle")
        return
      }

      if (!checkBasemapStyle(basemapStyle)) {
        promise?.reject("INVALID_BASEMAP_STYLE", "Unrecognized or null basemap style: $basemapStyle")
        return
      }

      val style = getBaseMapStyles(basemapStyle)
      val map = ArcGISMap(style)
      map.maxScale = 1000.0 // Set maxScale to 1:1000, which is a very zoomed-in view
      map.minScale = 100000000.0 // Set minScale to 1:100,000,000, which is a very zoomed-out view
      setMap(mapId, map)
      promise?.resolve("Map created successfully.")
    } catch (e: Exception) {
      promise?.reject("MAP_CREATION_ERROR", e)
    }
  }

  @ReactMethod
  override fun disposeMap(mapId: String?, promise: Promise?) {
    try {
      if (mapId == null || mapId.isEmpty()) {
        promise?.reject("INVALID_MAP_ID", "Map ID cannot be null or empty")
        return
      }

      val map = getMap(mapId)
      if (map == null) {
        promise?.reject("MAP_NOT_FOUND", "No map found with the provided ID")
        return
      }

      removeMap(mapId)
      promise?.resolve("Map disposed successfully.")
    } catch (e: Exception) {
      promise?.reject("DISPOSAL_ERROR", e)
    }
  }

  @ReactMethod
  override fun setViewpoint(mapId: String?, viewpoint: ReadableMap?, promise: Promise?) {
    try {
      if (mapId == null || mapId.isEmpty()) {
        promise?.reject("INVALID_MAP_ID", "Map ID cannot be null or empty")
        return
      }

      if (viewpoint == null) {
        promise?.reject("INVALID_VIEWPOINT", "Viewpoint cannot be null")
        return
      }

      val map = getMap(mapId)
      if (map == null) {
        promise?.reject("MAP_NOT_FOUND", "No map found with the provided ID")
        return
      }

      val latitude = viewpoint.getDouble("latitude")
      val longitude = viewpoint.getDouble("longitude")
      val scale = viewpoint.getDouble("scale")
      map.initialViewpoint = Viewpoint(latitude, longitude , scale)
      promise?.resolve("Viewpoint set successfully.")
    } catch (e: Exception) {
      promise?.reject("SET_VIEWPOINT_ERROR", e)
    }
  }

  @ReactMethod
  override fun setBasemapStyle(mapId: String?, basemapStyle: String?, promise: Promise?) {
    try {
      if (mapId == null || mapId.isEmpty()) {
        promise?.reject("INVALID_MAP_ID", "Map ID cannot be null or empty")
        return
      }

      if (basemapStyle == null || basemapStyle.isEmpty()) {
        promise?.reject("INVALID_BASEMAP_STYLE", "Basemap style cannot be null or empty")
        return
      }

      if (!checkBasemapStyle(basemapStyle)) {
        promise?.reject("INVALID_BASEMAP_STYLE", "Unrecognized or null basemap style: $basemapStyle")
        return
      }

      val map = getMap(mapId)
      if (map == null) {
        promise?.reject("MAP_NOT_FOUND", "No map found with the provided ID")
        return
      }

      val style = getBaseMapStyles(basemapStyle)
      setMap(mapId, ArcGISMap(style))
      promise?.resolve("Basemap style set successfully.")

    } catch (e: Exception) {
      promise?.reject("SET_BASEMAP_STYLE_ERROR", e)
    }
  }

  private fun getBaseMapStyles(style: String): BasemapStyle {
     return  when (style) {
      "arcGISTopographic" -> BasemapStyle.ArcGISTopographic
      "arcGISStreets" -> BasemapStyle.ArcGISStreets
      "arcGISImagery" -> BasemapStyle.ArcGISImagery
      "arcGISDarkGray" -> BasemapStyle.ArcGISDarkGray
      "ArcGISHumanGeography" -> BasemapStyle.ArcGISHumanGeography
      "arcGISLightGray" -> BasemapStyle.ArcGISLightGray
      "arcGISNavigation" -> BasemapStyle.ArcGISNavigation
      "arcGISOceans" -> BasemapStyle.ArcGISOceans
      "arcGISTerrain" -> BasemapStyle.ArcGISTerrain
      else -> BasemapStyle.ArcGISTopographic
    }
  }

  private fun checkBasemapStyle(style: String?): Boolean {
    val validStyles = setOf(
      "arcGISTopographic",
      "arcGISStreets",
      "arcGISImagery",
      "arcGISDarkGray",
      "ArcGISHumanGeography",
      "arcGISLightGray",
      "arcGISNavigation",
      "arcGISOceans",
      "arcGISTerrain"
    )
    return style != null && validStyles.contains(style)
  }

  companion object {
    private val maps = ConcurrentHashMap<String, ArcGISMap>()
    fun getMap(id: String): ArcGISMap? = maps[id]
    fun setMap(id: String, map: ArcGISMap) { maps[id] = map }
    fun removeMap(id: String) { maps.remove(id) }
  }
}
