import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeIcon, User2Icon} from 'lucide-react-native';
import BottomTabBar from '@mobile/components/BottomTabBar';

// @screen
import MainScreen from '@mobile/screens/MainScreen';
import ProfileScreen from '@mobile/screens/ProfileScreen';

// @icons
const TabHomeIcon = ({color}: {color: string}) => (
  <HomeIcon color={color} size={24} />
);
const TabProfileIcon = ({color}: {color: string}) => (
  <User2Icon color={color} size={24} />
);

// @stacks
const BottomTabs = createBottomTabNavigator();
function MainNavigation() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={BottomTabBar}>
      <BottomTabs.Screen
        name="Home"
        component={MainScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: TabHomeIcon,
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: TabProfileIcon,
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default MainNavigation;
