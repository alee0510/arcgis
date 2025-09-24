import { NativeModules, Platform } from 'react-native';
import NativeLocationModule, {
  type LocationResult,
} from './NativeLocationModule';

const LINKING_ERROR =
  `The package 'react-native-location' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const LocationModule = isTurboModuleEnabled
  ? NativeLocationModule
  : NativeModules.LocationModule;

if (!LocationModule) {
  throw new Error(LINKING_ERROR);
}

export type { LocationResult };

// @High-level JS wrapper
export class Location {
  static async requestLocationPermission(): Promise<boolean> {
    return LocationModule.requestLocationPermission();
  }

  static async hasLocationPermission(): Promise<boolean> {
    return LocationModule.hasLocationPermission();
  }

  static async getCurrentLocation(): Promise<LocationResult> {
    return LocationModule.getCurrentLocation();
  }
}

export default Location;
