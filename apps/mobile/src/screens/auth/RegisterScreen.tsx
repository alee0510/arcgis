import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, HelperText, TextInput, Appbar} from 'react-native-paper';

export function RegisterScreen() {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <Appbar>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Register" />
      </Appbar>
      <View style={styles.content}>
        <TextInput
          label="Name"
          mode="outlined"
          autoCapitalize="none"
          value={username}
          onChangeText={text => {
            setUsername(text);
          }}
          disabled={false}
        />
        <TextInput
          label="Email"
          mode="outlined"
          autoCapitalize="none"
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
          disabled={false}
        />
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry={!visible}
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
          disabled={false}
          right={
            <TextInput.Icon
              icon={visible ? 'eye-off' : 'eye'}
              onPress={() => setVisible(!visible)}
            />
          }
        />
        <TextInput
          label="Confirm Password"
          mode="outlined"
          secureTextEntry={!visible}
          value={confirmPassword}
          onChangeText={text => {
            setConfirmPassword(text);
          }}
          disabled={false}
          right={
            <TextInput.Icon
              icon={visible ? 'eye-off' : 'eye'}
              onPress={() => setVisible(!visible)}
            />
          }
        />
        <HelperText type="error" visible={false}>
          Passwords do not match
        </HelperText>
        <Button
          mode="contained"
          icon="login"
          onPress={() => {}}
          loading={false}
          disabled={false}>
          Register
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {
    flex: 1,
    gap: 16,
    padding: 16,
    backgroundColor: '#fff',
  },
  logo: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
});

export default RegisterScreen;
