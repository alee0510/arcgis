import {CommonActions} from '@react-navigation/native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {BottomNavigation, MD2Colors} from 'react-native-paper';

function BottomNavigationBar({
  navigation,
  state,
  descriptors,
  insets,
  ...props
}: BottomTabBarProps) {
  return (
    <BottomNavigation.Bar
      {...props}
      style={{backgroundColor: MD2Colors.purple100}}
      activeColor={MD2Colors.purple600}
      activeIndicatorStyle={{backgroundColor: MD2Colors.purple300}}
      inactiveColor={MD2Colors.purple200}
      navigationState={state}
      safeAreaInsets={insets}
      onTabPress={({route, preventDefault}) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });
        if (event.defaultPrevented) {
          preventDefault();
        } else {
          navigation.dispatch({
            ...CommonActions.navigate(route.name, route.params),
            target: state.key,
          });
        }
      }}
      renderIcon={({route, focused, color}) =>
        descriptors[route.key].options.tabBarIcon?.({
          focused,
          color,
          size: 24,
        }) || null
      }
      getLabelText={({route}) => {
        const {options} = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : typeof options.title === 'string'
            ? options.title
            : route.name;

        return label;
      }}
    />
  );
}

export default BottomNavigationBar;
