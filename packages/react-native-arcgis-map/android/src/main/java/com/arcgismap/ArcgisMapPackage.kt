package com.arcgismap

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.arcgismapspec.NativeArcgisMapModuleSpec
import java.util.HashMap

class ArcgisMapViewPackage : BaseReactPackage() {
  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return when (name) {
      NativeArcgisMapModuleSpec.NAME -> ArcgisMapModule(reactContext)
      else -> null
    }
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      val moduleInfos = HashMap<String, ReactModuleInfo>()
      moduleInfos[NativeArcgisMapModuleSpec.NAME] = ReactModuleInfo(
        NativeArcgisMapModuleSpec.NAME,
        NativeArcgisMapModuleSpec.NAME,
        canOverrideExistingModule = false, // canOverrideExistingModule
        needsEagerInit = false, // needsEagerInit
        isCxxModule = false, // isCxxModule
        isTurboModule = true  // isTurboModule
      )
      moduleInfos
    }
  }
}
