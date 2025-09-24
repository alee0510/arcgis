import NativeLocationModule, {
  type LocationResult,
} from './NativeLocationModule';
import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

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

const eventEmitter = new NativeEventEmitter(LocationModule);

export type { LocationResult };

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

  static async startLocationUpdates(
    distanceFilter: number = 10
  ): Promise<void> {
    return LocationModule.startLocationUpdates(distanceFilter);
  }

  static async stopLocationUpdates(): Promise<void> {
    return LocationModule.stopLocationUpdates();
  }

  static addLocationListener(callback: (location: LocationResult) => void) {
    return eventEmitter.addListener('onLocationChanged', callback);
  }

  static addLocationErrorListener(
    callback: (error: { code: number; message: string }) => void
  ) {
    return eventEmitter.addListener('onLocationError', callback);
  }
}

export default Location;
