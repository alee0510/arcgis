import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// @Navigation
import RootNavigation from '@mobile/navigations/RootNavigation';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <RootNavigation />
    </SafeAreaProvider>
  );
}

export default App;
