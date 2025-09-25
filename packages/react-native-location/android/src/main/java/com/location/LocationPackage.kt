package com.location

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.locationspec.NativeLocationModuleSpec
import java.util.HashMap

class LocationPackage : BaseReactPackage() {
  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return if (name == NativeLocationModuleSpec.NAME) {
      LocationModule(reactContext)
    } else {
      null
    }
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
      moduleInfos[NativeLocationModuleSpec.NAME] = ReactModuleInfo(
        NativeLocationModuleSpec.NAME,
        NativeLocationModuleSpec.NAME,
        canOverrideExistingModule = false,  // canOverrideExistingModule
        needsEagerInit = false,  // needsEagerInit
        isCxxModule = false,  // isCxxModule
        isTurboModule = true // isTurboModule
      )
      moduleInfos
    }
  }
}
