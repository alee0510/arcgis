import {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, MD2Colors} from 'react-native-paper';
import {Location} from '@arcgis/react-native-location';
import type {LocationResult} from '@arcgis/react-native-location';

export default function MainScreen() {
  const [location, setLocation] = useState<LocationResult | null>(null);

  // Request location permission and get current location
  const requestLocationPermission = async () => {
    try {
      const granted = await Location.requestLocationPermission();
      if (granted) {
        const loc = await Location.getCurrentLocation();
        console.log('Current location:', loc);
        setLocation(loc);
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">{location?.altitude}</Text>
      <Text variant="headlineMedium">{location?.longitude}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MD2Colors.white,
  },
});
