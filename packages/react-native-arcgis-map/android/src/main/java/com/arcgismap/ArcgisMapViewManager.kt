package com.arcgismap

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.ArcgisMapViewManagerInterface
import com.facebook.react.viewmanagers.ArcgisMapViewManagerDelegate

@ReactModule(name = ArcgisMapViewManager.NAME)
class ArcgisMapViewManager(context: ReactApplicationContext) : SimpleViewManager<ArcgisMapView>(), ArcgisMapViewManagerInterface<ArcgisMapView> {
  private val mDelegate: ViewManagerDelegate<ArcgisMapView> = ArcgisMapViewManagerDelegate(this)

  override fun getDelegate(): ViewManagerDelegate<ArcgisMapView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): ArcgisMapView {
    return ArcgisMapView(context)
  }

  @ReactProp(name = "mapId")
  override fun setMapId(view: ArcgisMapView, value: String?) {
    if (value == null || value.isEmpty()) {
      Log.e(NAME, "setMapId: mapId is null or empty")
      return
    }
    view.mapId = value
  }

  override fun getExportedCustomBubblingEventTypeConstants(): Map<String?, Any?>? {
    return mapOf(
      "onReady" to mapOf(
        "phasedRegistrationNames" to mapOf(
          "bubbled" to "onReady",
          "captured" to "onReadyCapture"
        )
      ),
      "onError" to mapOf(
        "phasedRegistrationNames" to mapOf(
          "bubbled" to "onError",
          "captured" to "onErrorCapture"
        )
      )
    )
  }

  companion object {
    const val NAME = "ArcgisMapView"
  }
}
