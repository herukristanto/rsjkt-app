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
import BookingScreen from '../screens/BookingScreen';

const HomeStack = createStackNavigator();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? 'rgb(7,94,85)' : '',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : 'rgb(7,94,85)',
      }}
    >
      <HomeStack.Screen
        name='Home'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name='Login' component={LoginScreen} />
      <HomeStack.Screen name='Dokter' component={DokterScreen} />
      <HomeStack.Screen name='Booking' component={BookingScreen} />
      <HomeStack.Screen
        name='LoginDokter'
        component={LoginDokterScreen}
        options={({ navigation }) => ({
          headerTitle: 'Login Dokter',
        })}
      />
      <HomeStack.Screen name='Register' component={RegisterScreen} />
      <HomeStack.Screen
        name='RegistrasiPoliklinik'
        component={RegistrasiPoliklinik}
        options={({ navigation }) => ({
          headerTitle: 'Registrasi Poliklinik',
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
