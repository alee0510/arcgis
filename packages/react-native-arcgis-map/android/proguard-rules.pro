# ArcGIS Maps SDK for Kotlin ProGuard Rules

# Keep all ArcGIS classes
-keep class com.esri.** { *; }
-dontwarn com.esri.**

# Keep all ArcGIS native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# Keep license manager
-keep class com.esri.arcgisruntime.internal.licensing.** { *; }

# Keep authentication classes
-keep class com.esri.arcgisruntime.security.** { *; }

# Keep all HTTP and networking related classes
-keep class com.esri.arcgisruntime.internal.io.** { *; }

# Keep geometry classes
-keep class com.esri.arcgisruntime.geometry.** { *; }

# Keep symbology classes
-keep class com.esri.arcgisruntime.symbology.** { *; }

# Keep data classes
-keep class com.esri.arcgisruntime.data.** { *; }

# Keep mapping classes
-keep class com.esri.arcgisruntime.mapping.** { *; }

# Keep portal classes
-keep class com.esri.arcgisruntime.portal.** { *; }

# Keep task classes
-keep class com.esri.arcgisruntime.tasks.** { *; }

# Keep utilities
-keep class com.esri.arcgisruntime.util.** { *; }

# Keep all enums
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# Keep Parcelable implementations
-keep class * implements android.os.Parcelable {
    public static final android.os.Parcelable$Creator *;
}

# Kotlin specific rules
-keep class kotlin.** { *; }
-keep class kotlin.Metadata { *; }
-dontwarn kotlin.**
-keepclassmembers class **$WhenMappings {
    <fields>;
}
-keepclassmembers class kotlin.Metadata {
    public <methods>;
}

# Kotlinx Coroutines
-keepnames class kotlinx.coroutines.internal.MainDispatcherFactory {}
-keepnames class kotlinx.coroutines.CoroutineExceptionHandler {}
-keepnames class kotlinx.coroutines.android.AndroidExceptionPreHandler {}
-keepnames class kotlinx.coroutines.android.AndroidDispatcherFactory {}

# OkHttp
-dontwarn okhttp3.**
-dontwarn okio.**

# Gson
-keepattributes Signature
-keepattributes *Annotation*
-dontwarn sun.misc.**
-keep class com.google.gson.examples.android.model.** { <fields>; }
-keep class * extends com.google.gson.TypeAdapter
-keep class * implements com.google.gson.TypeAdapterFactory
-keep class * implements com.google.gson.JsonSerializer
-keep class * implements com.google.gson.JsonDeserializer