import { TurboModuleRegistry } from 'react-native';
import type { TurboModule } from 'react-native';
import type { Float } from 'react-native/Libraries/Types/CodegenTypes';

export type BaseMapStyle =
  | 'ARCGIS_IMAGERY'
  | 'ARCGIS_IMAGERY_STANDARD'
  | 'ARCGIS_IMAGERY_LABELS'
  | 'ARCGIS_LIGHT_GRAY'
  | 'ARCGIS_DARK_GRAY'
  | 'ARCGIS_NAVIGATION'
  | 'ARCGIS_STREETS'
  | 'ARCGIS_STREETS_NIGHT'
  | 'ARCGIS_STREETS_RELIEF'
  | 'ARCGIS_TOPOGRAPHIC'
  | 'ARCGIS_TERRAIN'
  | 'ARCGIS_OCEANS'
  | 'ARCGIS_HILLSHADE_LIGHT'
  | 'ARCGIS_HILLSHADE_DARK'
  | 'ARCGIS_CHARTED_TERRITORY'
  | 'ARCGIS_MODERN_ANTIQUE'
  | 'ARCGIS_OPEN_STREET_MAP';

export type Viewpoint = {
  latitude: Float;
  longitude: Float;
  scale: Float;
};

export interface Spec extends TurboModule {
  init(key: string): Promise<string>;
  create(basemapStyle: BaseMapStyle): Promise<string>; // returns mapId
  dispose(mapId: string): Promise<string>;
  setViewpoint(mapId: string, viewpoint: Viewpoint): Promise<string>;
  setBasemap(mapId: string, basemapStyle: BaseMapStyle): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ArcgisMapModule');
