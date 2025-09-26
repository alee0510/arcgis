import {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';
import {Location} from '@arcgis/react-native-location';
import {ArcgisMap, ArcgisMapView} from '@arcgis/react-native-arcgis-map';
import LoadingScreen from '@mobile/screens/LoadingScreen';
import type {LocationResult} from '@arcgis/react-native-location';
import {env} from '@mobile/env';

const MAP_ID = 'e691172';
export default function MainScreen() {
  const [location, setLocation] = useState<LocationResult | null>(null);
  const [mapReady, setMapReady] = useState(false);

  // Request location permission and get current location
  const requestLocationPermission = async () => {
    try {
      const granted = await Location.requestLocationPermission();
      if (granted) {
        const loc = await Location.getCurrentLocation();
        console.log('Current location:', loc);
        setLocation(loc);
        const initResult = await ArcgisMap.init(env.ARCGIS_API_KEY);
        const createResult = await ArcgisMap.create(
          MAP_ID,
          'arcGISTopographic',
        );
        const setViewpointResult = await ArcgisMap.setViewpoint(MAP_ID, {
          latitude: loc.latitude,
          longitude: loc.longitude,
          scale: 10000,
        });
        console.log(
          'ArcGIS Map initialized:',
          initResult,
          createResult,
          setViewpointResult,
        );
        setMapReady(true);
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  useEffect(() => {
    requestLocationPermission();

    return () => {
      ArcgisMap.dispose(MAP_ID);
    };
  }, []);

  console.log('Rendering MainScreen with location:', location);
  console.log('API Key:', env.ARCGIS_API_KEY);
  return (
    <View style={styles.container}>
      {mapReady && location ? (
        <ArcgisMapView
          mapId={MAP_ID}
          style={styles.map}
          onError={e => console.error('ArcgisMapView error:', e.nativeEvent)}
          onReady={e => console.log('ArcgisMapView ready:', e.nativeEvent)}
        />
      ) : (
        <LoadingScreen />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MD2Colors.white,
    position: 'relative',
  },
  map: {
    height: 300,
    width: 300,
    top: 0,
    left: 0,
    backgroundColor: MD2Colors.blue50,
    zIndex: 100,
  },
});
