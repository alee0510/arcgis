import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { HostComponent, ViewProps } from 'react-native';
import type { BubblingEventHandler } from 'react-native/Libraries/Types/CodegenTypes';

export interface NativeProps extends ViewProps {
  mapId?: string;
  onReady?: BubblingEventHandler<{ message: string }>;
  onError?: BubblingEventHandler<{ message: string }>;
}

export default codegenNativeComponent<NativeProps>(
  'ArcgisMapView'
) as HostComponent<NativeProps>;
