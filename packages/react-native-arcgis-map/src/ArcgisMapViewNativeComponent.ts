import type { HostComponent, ViewProps } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

interface NativeProps extends ViewProps {
  id?: string;
}

export default codegenNativeComponent<NativeProps>(
  'ArcgisMapView'
) as HostComponent<NativeProps>;
