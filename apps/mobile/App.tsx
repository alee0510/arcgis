import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import LoginScreen from './src/screens/auth/LoginScreen';
import HomeScreen from './src/screens/MainScreen';
import ProfileScreen from './src/screens/ProfileScreen';

function App(): React.JSX.Element {
  return <ProfileScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
