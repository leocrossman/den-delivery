import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import OrderScreen from '../screens/OrderScreen';
import MenuScreen from '../screens/MenuScreen';
import SettingsScreen from '../screens/InfoScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const OrderStack = createStackNavigator(
  {
    Order: OrderScreen,
  },
  config
);

OrderStack.navigationOptions = {
  tabBarLabel: 'Order',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-rocket' : 'md-information-circle'}
    />
  ),
};

OrderStack.path = '';

const MenuStack = createStackNavigator(
  {
    Menu: MenuScreen,
  },
  config
);

MenuStack.navigationOptions = {
  tabBarLabel: 'Menu',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-book' : 'md-link'}
    />
  ),
};

MenuStack.path = '';

const InfoStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

InfoStack.navigationOptions = {
  tabBarLabel: 'Info',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

InfoStack.path = '';

const tabNavigator = createBottomTabNavigator({
  OrderStack,
  MenuStack,
  InfoStack,
});

tabNavigator.path = '';

export default tabNavigator;
