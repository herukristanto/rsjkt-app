import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { Platform, SafeAreaView, AsyncStorage } from 'react-native';
import { Layout, Button } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RegistrasiPoliklinik from '../screens/RegistrasiPoliklinikScreen';
import DokterScreen from '../screens/DokterScreen';
import BookingScreen from '../screens/BookingScreen';
import { AppContext } from '../context/AppContext';
import { LOGOUT } from '../reducer/AppReducer';

const HomeStack = createStackNavigator();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? 'rgb(7,94,85)' : '',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : 'rgb(7,94,85)',
        headerTitleStyle: {
          fontFamily: 'calibri',
        },
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

const HomeDrawer = createDrawerNavigator();
const HomeDrawerNavigator = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleLogout = (props) => {
    const { navigation } = props;
    AsyncStorage.removeItem('_USERDATA_');
    dispatch({ type: LOGOUT });
    navigation.closeDrawer();
  };

  const handleLogin = (props) => {
    const { navigation } = props;
    navigation.navigate('Login');
  };

  return (
    <HomeDrawer.Navigator
      drawerContent={(props) => {
        return (
          <Layout style={{ flex: 1, paddingTop: 25 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItem
                label='RS Jakarta Mobile'
                labelStyle={{ fontFamily: 'calibri', fontSize: 16 }}
              />
              {state.isLogin && (
                <Button status='success' onPress={() => handleLogout(props)}>
                  Logout
                </Button>
              )}
              {!state.isLogin && (
                <Button status='success' onPress={() => handleLogin(props)}>
                  Login
                </Button>
              )}
            </SafeAreaView>
          </Layout>
        );
      }}
    >
      <HomeDrawer.Screen name='Dashboard' component={HomeStackNavigator} />
    </HomeDrawer.Navigator>
  );
};

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <HomeDrawerNavigator />
    </NavigationContainer>
  );
};

export default RootNavigation;
