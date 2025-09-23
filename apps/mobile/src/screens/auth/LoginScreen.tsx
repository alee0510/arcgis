import {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Button, HelperText, Text, TextInput} from 'react-native-paper';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={require('@mobile/assets/login.jpg')} style={styles.logo} />
      <Text style={styles.header}>Login</Text>
      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        autoCapitalize="none"
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
      <HelperText type="error" visible={false}>
        Invalid email or password
      </HelperText>
      <Button
        mode="contained"
        icon="login"
        onPress={() => {}}
        loading={false}
        disabled={false}>
        Login
      </Button>
      <View style={styles.linkContainer}>
        <Text style={styles.text}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.link}> Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 32,
    gap: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
    width: '100%',
    gap: 4,
  },
  text: {
    fontSize: 16,
  },
  link: {
    fontSize: 16,
    color: 'purple',
    fontWeight: 'bold',
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});

export default LoginScreen;
