package com.arcgismap

import android.content.Context
import android.widget.FrameLayout
import android.util.Log
import com.arcgismaps.mapping.view.MapView

class ArcgisMapView(context: Context): FrameLayout(context)  {
    private var mapView: MapView = MapView(context)
    var mapId: String? = null
        set(value) {
            field = value
            value?.let { id ->
                val map = ArcgisMapModule.getMap(id)
                if (map != null) {
                    mapView.map = map
                    Log.d("ArcgisMapView", "Map with id $id set successfully.")
                } else {
                    Log.e("ArcgisMapView", "No map found with id $id.")
                }
            }
        }

    init {
        addView(mapView, LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT))
    }

    fun getMapView(): MapView {
        return mapView
    }
}
