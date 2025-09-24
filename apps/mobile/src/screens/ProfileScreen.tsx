import {View, StyleSheet} from 'react-native';
import {Button, Appbar, MD2Colors} from 'react-native-paper';
import {useAuth} from '@mobile/store/auth';

function ProfileScreen() {
  const {clearUser} = useAuth();
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Profile" color={MD2Colors.white} />
      </Appbar.Header>
      <View style={styles.content}>
        <Button mode="contained" onPress={clearUser}>
          Logout
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    backgroundColor: MD2Colors.purple300,
  },
});

export default ProfileScreen;
