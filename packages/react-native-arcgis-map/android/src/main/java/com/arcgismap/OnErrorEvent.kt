package com.arcgismap

import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event
class OnErrorEvent(surfaceId: Int, viewTag: Int, private val payload: WritableMap) : Event<OnErrorEvent>(surfaceId, viewTag) {
  override fun getEventName(): String = "onError"
  override fun getEventData(): WritableMap = payload
}
