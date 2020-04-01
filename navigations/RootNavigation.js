import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RegistrasiPoliklinik from '../screens/RegistrasiPoliklinikScreen';
import LoginDokterScreen from '../screens/LoginDokterScreen';
import DokterScreen from '../screens/DokterScreen';
import { useTheme } from '@ui-kitten/components';

const HomeStack = createStackNavigator();
const HomeStackNavigator = () => {
  const theme = useTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:
            Platform.OS === 'android' ? theme['color-success-700'] : ''
        },
        headerTintColor:
          Platform.OS === 'android' ? 'white' : theme['color-success-700']
      }}
    >
      <HomeStack.Screen
        name='Home'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name='Login' component={LoginScreen} />
      <HomeStack.Screen name='Dokter' component={DokterScreen} />
      <HomeStack.Screen
        name='LoginDokter'
        component={LoginDokterScreen}
        options={({ navigation }) => ({
          headerTitle: 'Login Dokter'
        })}
      />
      <HomeStack.Screen name='Register' component={RegisterScreen} />
      <HomeStack.Screen
        name='RegistrasiPoliklinik'
        component={RegistrasiPoliklinik}
        options={({ navigation }) => ({
          headerTitle: 'Registrasi Poliklinik'
        })}
      />
    </HomeStack.Navigator>
  );
};

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
};

export default RootNavigation;
