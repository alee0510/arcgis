package com.arcgismap

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.ArcgisMapViewManagerInterface
import com.facebook.react.viewmanagers.ArcgisMapViewManagerDelegate

@ReactModule(name = ArcgisMapViewManager.NAME)
class ArcgisMapViewManager : SimpleViewManager<ArcgisMapView>(),
  ArcgisMapViewManagerInterface<ArcgisMapView> {
  private val mDelegate: ViewManagerDelegate<ArcgisMapView>

  init {
    mDelegate = ArcgisMapViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<ArcgisMapView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): ArcgisMapView {
    return ArcgisMapView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: ArcgisMapView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "ArcgisMapView"
  }
}
