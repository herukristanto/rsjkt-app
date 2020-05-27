import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StartupScreen from '../screens/StartupScreen';

import HomeNavigation from './HomeNavigation';
import DokterNavigation from './DokterNavigation';

const RootStack = createStackNavigator();
const RootStackNavigation = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name='Startup'
        component={StartupScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name='HomeNavigation'
        component={HomeNavigation}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name='DokterNavigation'
        component={DokterNavigation}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};
const RootNavigation = () => {
  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
};

export default RootNavigation;
