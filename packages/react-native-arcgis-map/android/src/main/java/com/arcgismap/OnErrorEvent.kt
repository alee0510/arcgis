package com.arcgismap

import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class OnErrorEvent(
    surfaceId: Int,
    viewId: Int,
    private val eventData: WritableMap
) : Event<OnErrorEvent>(surfaceId, viewId) {

    override fun getEventName(): String = "onError"

    override fun getEventData(): WritableMap? = eventData
}
