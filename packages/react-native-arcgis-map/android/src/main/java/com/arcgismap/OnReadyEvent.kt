package com.arcgismap

import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class OnReadyEvent(
    surfaceId: Int,
    viewId: Int,
    private val eventData: WritableMap
) : Event<OnReadyEvent>(surfaceId, viewId) {

    override fun getEventName(): String = "onReady"

    override fun getEventData(): WritableMap? = eventData
}
