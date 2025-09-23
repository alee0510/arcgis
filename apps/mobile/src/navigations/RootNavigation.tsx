import {useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

// @Screens or Navigations
import MainNavigation from '@mobile/navigations/MainNavigation';
import AuthNavigation from '@mobile/navigations/AuthNavigation';

// @Root Navigation
function RootNavigation() {
  const [isReady] = useState(false);

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        {isReady ? <MainNavigation /> : <AuthNavigation />}
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RootNavigation;
