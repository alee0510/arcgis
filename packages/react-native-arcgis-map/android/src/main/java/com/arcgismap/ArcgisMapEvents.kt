package com.arcgismap

import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

// Custom Event Classes
class OnReadyEvent(surfaceId: Int, viewTag: Int, private val payload: WritableMap) : Event<OnReadyEvent>(surfaceId, viewTag) {
  override fun getEventName(): String = "onReady"
  override fun getEventData(): WritableMap = payload
}

class OnErrorEvent(surfaceId: Int, viewTag: Int, private val payload: WritableMap) : Event<OnErrorEvent>(surfaceId, viewTag) {
  override fun getEventName(): String = "onError"
  override fun getEventData(): WritableMap = payload
}
