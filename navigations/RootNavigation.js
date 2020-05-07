import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  Platform,
  SafeAreaView,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import { Layout, Button, Icon, Spinner, Text } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RegistrasiPoliklinik from '../screens/RegistrasiPoliklinikScreen';
import DokterScreen from '../screens/DokterScreen';
import BookingScreen from '../screens/BookingScreen';
import { AppContext } from '../context/AppContext';
import { LOGOUT } from '../reducer/AppReducer';
import SingleBookingScreen from '../screens/SingleBookingScreen';
import PromoScreen from '../screens/PromoScreen';
import ResetPasswordDokterScreen from '../screens/ResetPasswordDokterScreen';
import ListPraktekScreen from '../screens/ListPraktekScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import LokasiScreen from '../screens/LokasiScreen';
import ListPoliklinikScreen from '../screens/ListPoliklinikScreen';
import JadwalDokterScreen from '../screens/JadwalDokterScreen';

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
      <HomeStack.Screen
        name='Login'
        component={LoginScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <HomeStack.Screen name='Dokter' component={DokterScreen} />
      <HomeStack.Screen
        name='Booking'
        component={BookingScreen}
        options={({ navigation }) => {
          return {
            headerTitle: 'Cek Pendaftaran',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity onPress={() => {}} style={{ marginRight: 10 }}>
                <Icon
                  style={{ width: 24, height: 24 }}
                  fill='yellow'
                  name='bell'
                />
              </TouchableOpacity>
            ),
          };
        }}
      />
      <HomeStack.Screen
        name='SingleBooking'
        component={SingleBookingScreen}
        options={({ navigation }) => {
          return {
            headerTitle: 'QR CODE',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity onPress={() => {}} style={{ marginRight: 10 }}>
                <Icon
                  style={{ width: 24, height: 24 }}
                  fill='yellow'
                  name='bell'
                />
              </TouchableOpacity>
            ),
          };
        }}
      />
      <HomeStack.Screen name='Register' component={RegisterScreen} />
      <HomeStack.Screen
        name='RegistrasiPoliklinik'
        component={RegistrasiPoliklinik}
        options={({ navigation, route }) => {
          return {
            headerTitle: route.params
              ? route.params.title
              : 'Registrasi Poliklinik',
            headerRight: () => (
              <TouchableOpacity onPress={() => {}} style={{ marginRight: 10 }}>
                <Icon
                  style={{ width: 24, height: 24 }}
                  fill='yellow'
                  name='bell'
                />
              </TouchableOpacity>
            ),
            headerTitleAlign: 'center',
          };
        }}
      />
      <HomeStack.Screen
        name='Promo'
        component={PromoScreen}
        options={({ navigation }) => {
          return {
            headerTitle: 'Promo',
            headerRight: () => (
              <TouchableOpacity onPress={() => {}} style={{ marginRight: 10 }}>
                <Icon
                  style={{ width: 24, height: 24 }}
                  fill='yellow'
                  name='bell'
                />
              </TouchableOpacity>
            ),
            headerTitleAlign: 'center',
          };
        }}
      />
      <HomeStack.Screen
        name='Feedback'
        component={FeedbackScreen}
        options={({ navigation }) => {
          return {
            headerTitle: 'Feedback',
            headerRight: () => (
              <TouchableOpacity onPress={() => {}} style={{ marginRight: 10 }}>
                <Icon
                  style={{ width: 24, height: 24 }}
                  fill='yellow'
                  name='bell'
                />
              </TouchableOpacity>
            ),
            headerTitleAlign: 'center',
          };
        }}
      />
      <HomeStack.Screen
        name='Lokasi'
        component={LokasiScreen}
        options={({ navigation }) => {
          return {
            headerTitle: 'Lokasi',
            headerRight: () => (
              <TouchableOpacity onPress={() => {}} style={{ marginRight: 10 }}>
                <Icon
                  style={{ width: 24, height: 24 }}
                  fill='yellow'
                  name='bell'
                />
              </TouchableOpacity>
            ),
            headerTitleAlign: 'center',
          };
        }}
      />
      <HomeStack.Screen
        name='ListPoliklinik'
        component={ListPoliklinikScreen}
        options={({ navigation }) => {
          return {
            headerShown: false,
          };
        }}
      />
      <HomeStack.Screen
        name='JadwalDokter'
        component={JadwalDokterScreen}
        options={({ navigation, route }) => {
          return {
            headerShown: false,
          };
        }}
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
            </SafeAreaView>
          </Layout>
        );
      }}
    >
      <HomeDrawer.Screen name='Dashboard' component={HomeStackNavigator} />
    </HomeDrawer.Navigator>
  );
};

const DokterStack = createStackNavigator();
const DokterStackNavigator = () => {
  return (
    <DokterStack.Navigator
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
      <DokterStack.Screen
        name='Dokter'
        component={DokterScreen}
        options={{ headerShown: false }}
      />
      <DokterStack.Screen
        name='ListPraktek'
        component={ListPraktekScreen}
        options={{ headerShown: false }}
      />
    </DokterStack.Navigator>
  );
};

const DokterDrawer = createDrawerNavigator();
const DokterDrawerNavigator = () => {
  const { dispatch } = useContext(AppContext);

  const handleLogout = (props) => {
    const { navigation } = props;
    AsyncStorage.removeItem('_USERDATA_');
    dispatch({ type: LOGOUT });
    navigation.closeDrawer();
  };

  return (
    <DokterDrawer.Navigator
      drawerContent={(props) => {
        return (
          <Layout style={{ flex: 1, paddingTop: 25 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItem
                label='RS Jakarta Mobile'
                labelStyle={{ fontFamily: 'calibri', fontSize: 16 }}
              />
              <DrawerItemList {...props} />
              <TouchableOpacity
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 15,
                }}
              >
                <Text style={{ color: 'rgb(7,94,85)' }}>Lihat Feedback</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 15,
                }}
                onPress={() => handleLogout(props)}
              >
                <Text style={{ color: 'rgb(7,94,85)' }}>Logout</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </Layout>
        );
      }}
    >
      <DokterDrawer.Screen
        name='DashboardDokter'
        component={DokterStackNavigator}
        options={{
          title: 'Dashboard',
        }}
      />
      <DokterDrawer.Screen
        name='ResetPasswordDokter'
        component={ResetPasswordDokterScreen}
        options={{
          title: 'Reset Password',
        }}
      />
    </DokterDrawer.Navigator>
  );
};

const RootNavigation = () => {
  const { state } = useContext(AppContext);

  if (state.loading) {
    return (
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Spinner status='success' />
      </Layout>
    );
  } else {
    if (state.isLogin && state.user.role === 'dokter') {
      return (
        <NavigationContainer>
          <DokterDrawerNavigator />
        </NavigationContainer>
      );
    }

    return (
      <NavigationContainer>
        <HomeDrawerNavigator />
      </NavigationContainer>
    );
  }
};

export default RootNavigation;
