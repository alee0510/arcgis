import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import LoginScreen from '@mobile/screens/auth/LoginScreen';
import HomeScreen from '@mobile/screens/MainScreen';
import ProfileScreen from '@mobile/screens/ProfileScreen';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ProfileScreen />
    </SafeAreaProvider>
  );
}

export default App;
