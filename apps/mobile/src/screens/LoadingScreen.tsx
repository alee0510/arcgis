import {StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

function LoadingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator animating={true} color={MD2Colors.purple700} />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 16,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoadingScreen;
