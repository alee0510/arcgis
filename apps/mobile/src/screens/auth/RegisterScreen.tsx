import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, HelperText, TextInput, Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAuthRegister} from '@mobile/hooks/useAuth';

// @Types
type NavigationProps = StackNavigationProp<any, 'Register'>;

export function RegisterScreen() {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {mutate: register, error, isPending} = useAuthRegister();
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <Appbar>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          disabled={isPending}
        />
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
          disabled={isPending}
        />
        <TextInput
          label="Email"
          mode="outlined"
          autoCapitalize="none"
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
          disabled={isPending}
        />
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry={!visible}
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
          disabled={isPending}
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
          disabled={isPending}
          right={
            <TextInput.Icon
              icon={visible ? 'eye-off' : 'eye'}
              onPress={() => setVisible(!visible)}
            />
          }
        />
        <HelperText type="error" visible={!!error}>
          {error?.message}
        </HelperText>
        <Button
          mode="contained"
          icon="login"
          onPress={() => {
            register({username, email, password, confirmPassword});
          }}
          loading={isPending}
          disabled={isPending}>
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
