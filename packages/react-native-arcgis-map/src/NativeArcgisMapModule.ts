import { TurboModuleRegistry } from 'react-native';
import type { TurboModule } from 'react-native';
import type { Float } from 'react-native/Libraries/Types/CodegenTypes';

export type BaseMapStyle =
  | 'arcGISTopographic'
  | 'arcGISStreets'
  | 'arcGISImagery'
  | 'arcGISDarkGray'
  | 'ArcGISHumanGeography'
  | 'arcGISLightGray'
  | 'arcGISNavigation'
  | 'arcGISOceans'
  | 'arcGISTerrain';

export type Viewpoint = {
  latitude: Float;
  longitude: Float;
  scale: Float;
};

export interface Spec extends TurboModule {
  initialize(key: string): Promise<string>;
  createMap(
    mapId: string,
    basemapStyle: BaseMapStyle
  ): Promise<{ mapId: string }>; // returns mapId
  disposeMap(mapId: string): Promise<string>;
  setViewpoint(mapId: string, viewpoint: Viewpoint): Promise<string>;
  setBasemapStyle(mapId: string, basemapStyle: BaseMapStyle): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ArcgisMapModule');
