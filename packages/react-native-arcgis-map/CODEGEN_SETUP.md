# Codegen Setup for React Native ArcGIS Map

This package uses React Native's new architecture with both **TurboModule** and **Fabric Component** codegen.

## What's Been Set Up

### 1. Package Configuration

The `package.json` has been configured with:

- **react-native-builder-bob** with codegen target
- **codegenConfig** for both TurboModule and Fabric Component
- Generated code output directories

### 2. TurboModule Specification

- **File**: `src/NativeArcgisMapModule.ts`
- **Generated Android**: `android/build/generated/source/codegen/java/com/arcgismap/NativeArcgisMapModuleSpec.java`
- **Generated iOS**: `ios/generated/ArcgisMapSpec/ArcgisMapSpec.h`

The TurboModule provides these methods:

- `init(key: string): Promise<string>`
- `create(basemapStyle: BaseMapStyle): Promise<string>`
- `dispose(mapId: string): Promise<string>`
- `setViewpoint(mapId: string, viewpoint: Viewpoint): Promise<string>`
- `setBasemap(mapId: string, basemapStyle: BaseMapStyle): Promise<string>`

### 3. Fabric Component Specification

- **File**: `src/ArcgisMapViewNativeComponent.ts`
- **Generated Android**: `android/build/generated/source/codegen/jni/react/renderer/components/ArcgisMapSpec/`
- **Generated iOS**: `ios/generated/ArcgisMapSpec/`

The Fabric Component supports:

- Basic ViewProps (style, layout, etc.)
- Custom `id` prop
- Event handlers: `onReady`, `onError`

## Generated Files Structure

### iOS Generated Files

```
ios/generated/
├── ArcgisMapSpec/
│   ├── ArcgisMapSpec-generated.mm
│   ├── ArcgisMapSpec.h
│   ├── ComponentDescriptors.cpp/h
│   ├── EventEmitters.cpp/h
│   ├── Props.cpp/h
│   ├── ShadowNodes.cpp/h
│   ├── States.cpp/h
│   └── RCTComponentViewHelpers.h
├── ArcgisMapSpecJSI-generated.cpp
└── ArcgisMapSpecJSI.h
```

### Android Generated Files

```
android/build/generated/source/codegen/
├── java/com/arcgismap/
│   └── NativeArcgisMapModuleSpec.java
└── jni/
    ├── ArcgisMapSpec-generated.cpp
    ├── ArcgisMapSpec.h
    ├── CMakeLists.txt
    └── react/renderer/components/ArcgisMapSpec/
        ├── ComponentDescriptors.cpp/h
        ├── EventEmitters.cpp/h
        ├── Props.cpp/h
        ├── ShadowNodes.cpp/h
        ├── States.cpp/h
        └── ArcgisMapSpecJSI files
```

## Available Scripts

- `pnpm run prepare` - Build everything (TypeScript, Module, Codegen)
- `pnpm run codegen` - Generate only codegen files
- `pnpm run clean` - Clean all generated files
- `pnpm run typecheck` - Type checking

## Next Steps for Native Implementation

### For Android (Kotlin):

1. Create a class extending `NativeArcgisMapModuleSpec`
2. Implement all abstract methods from the generated spec
3. For Fabric Component, create a ViewManager and ViewGroup

### For iOS (Objective-C++):

1. Create a class conforming to `NativeArcgisMapModuleSpec` protocol
2. Implement all required methods
3. For Fabric Component, create a ComponentView

### Example Android TurboModule Implementation:

```kotlin
class ArcgisMapModule(reactContext: ReactApplicationContext) :
    NativeArcgisMapModuleSpec(reactContext) {

    override fun init(key: String, promise: Promise) {
        // Your implementation
    }

    override fun create(basemapStyle: String, promise: Promise) {
        // Your implementation
    }

    // ... other methods
}
```

### Example iOS TurboModule Implementation:

```objc
@interface ArcgisMapModule : NSObject <NativeArcgisMapModuleSpec>
@end

@implementation ArcgisMapModule
RCT_EXPORT_MODULE()

- (void)init:(NSString *)key
     resolve:(RCTPromiseResolveBlock)resolve
      reject:(RCTPromiseRejectBlock)reject {
    // Your implementation
}

// ... other methods
@end
```

## Important Notes

1. **Never edit generated files** - They will be overwritten on next codegen run
2. **Type safety** - The generated specs enforce type safety between JS and native
3. **Naming conventions** - Method names must match exactly between JS spec and native implementation
4. **Build process** - Always run codegen after changing specifications

The codegen setup is now complete and ready for native implementation!
