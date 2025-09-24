import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface LocationResult {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude?: number;
  heading?: number;
  speed?: number;
  timestamp: number;
}

export interface Spec extends TurboModule {
  // Request location permissions
  requestLocationPermission(): Promise<boolean>;

  // Check if location permission is granted
  hasLocationPermission(): Promise<boolean>;

  // Get current location once
  getCurrentLocation(): Promise<LocationResult>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('LocationModule');
