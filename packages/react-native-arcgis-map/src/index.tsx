import { NativeModules, Platform } from 'react-native';
import NativeArcgisMapModule from './NativeArcgisMapModule';
import type { BaseMapStyle, Viewpoint } from './NativeArcgisMapModule';

const LINKING_ERROR =
  `The package 'react-native-arcgis-map' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const ArcgisMapModule = isTurboModuleEnabled
  ? NativeArcgisMapModule
  : NativeModules.ArcgisMapModule;

if (!ArcgisMapModule) {
  throw new Error(LINKING_ERROR);
}

export class ArcgisMap {
  static async init(key: string): Promise<string> {
    return ArcgisMapModule.init(key);
  }

  static async creates(basemapStyle: BaseMapStyle): Promise<string> {
    return ArcgisMapModule.creates(basemapStyle);
  }

  static async dispose(mapId: string): Promise<string> {
    return ArcgisMapModule.dispose(mapId);
  }

  static async setViewpoint(
    mapId: string,
    viewpoint: Viewpoint
  ): Promise<string> {
    return ArcgisMapModule.setViewpoint(mapId, viewpoint);
  }

  static async setBasemap(
    mapId: string,
    basemapStyle: BaseMapStyle
  ): Promise<string> {
    return ArcgisMapModule.setBasemap(mapId, basemapStyle);
  }
}

export default ArcgisMap;
export { default as ArcgisMapView } from './ArcgisMapViewNativeComponent';
export * from './ArcgisMapViewNativeComponent';
export type { BaseMapStyle, Viewpoint };
