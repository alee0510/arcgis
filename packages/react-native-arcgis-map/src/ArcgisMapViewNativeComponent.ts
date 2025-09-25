import type { HostComponent, ViewProps } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';

export interface NativeProps extends ViewProps {
  id?: string;
  // Add any additional props you want to support
  onReady?: DirectEventHandler<{}>;
  onError?: DirectEventHandler<{ message: string }>;
}

export default codegenNativeComponent<NativeProps>(
  'ArcgisMapView'
) as HostComponent<NativeProps>;
