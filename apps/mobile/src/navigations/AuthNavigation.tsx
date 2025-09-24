import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackParamList} from '@mobile/types/navigation';

// @screens
import LoginScreen from '@mobile/screens/auth/LoginScreen';
import RegisterScreen from '@mobile/screens/auth/RegisterScreen';

// @stacks
const AuthStack = createStackNavigator<AuthStackParamList>();
function AuthNavigation() {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

export default AuthNavigation;
