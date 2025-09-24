import {useEffect, useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useCurrentUser} from '@mobile/hooks/useAuth';

// @Screens or Navigations
import MainNavigation from '@mobile/navigations/MainNavigation';
import AuthNavigation from '@mobile/navigations/AuthNavigation';
import LoadingScreen from '@mobile/screens/LoadingScreen';

// @Root Navigation
function RootNavigation() {
  const [isReady, setIsReady] = useState(false);
  const {data, isLoading} = useCurrentUser();

  // @Side-Effect
  useEffect(() => {
    if (!isLoading) {
      setIsReady(true);
    }
  }, [isLoading]);

  // @Loading
  if (isLoading || !isReady) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {data?.id ? <MainNavigation /> : <AuthNavigation />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RootNavigation;
