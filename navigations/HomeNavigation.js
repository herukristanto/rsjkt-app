import React, { useContext } from 'react';
import {
  Platform,
  SafeAreaView,
  AsyncStorage,
  TouchableOpacity,
  View,
} from 'react-native';
import { Layout, Icon, Text } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';

import FeedbackScreen from '../screens/FeedbackScreen';
import LokasiScreen from '../screens/LokasiScreen';
import ListPoliklinikScreen from '../screens/ListPoliklinikScreen';
import JadwalDokterScreen from '../screens/JadwalDokterScreen';
import ListPromoScreen from '../screens/ListPromoScreen';
import SingleBookingScreen from '../screens/SingleBookingScreen';
import PromoScreen from '../screens/PromoScreen';
import BookingScreen from '../screens/BookingScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RegistrasiPoliklinik from '../screens/RegistrasiPoliklinikScreen';
import { AppContext } from '../context/AppContext';
import { LOGOUT } from '../reducer/AppReducer';
import NotificationScreen from '../screens/NotificationScreen';
import NotificationBell from '../components/NotificationBell';

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
      <HomeStack.Screen
        name='Booking'
        component={BookingScreen}
        options={({ navigation }) => {
          return {
            headerTitle: 'Cek Pendaftaran',
            headerTitleAlign: 'center',
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                <NotificationBell />
              </View>
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
              <View style={{ marginRight: 10 }}>
                <NotificationBell />
              </View>
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
              <View style={{ marginRight: 10 }}>
                <NotificationBell />
              </View>
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
              <View style={{ marginRight: 10 }}>
                <NotificationBell />
              </View>
            ),
            headerTitleAlign: 'center',
          };
        }}
      />
      <HomeStack.Screen
        name='ListPromo'
        component={ListPromoScreen}
        options={({ navigation }) => {
          return {
            headerTitle: 'List Promo',
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                <NotificationBell />
              </View>
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
            headerTitle: 'Ulasan',
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                <NotificationBell />
              </View>
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
              <View style={{ marginRight: 10 }}>
                <NotificationBell />
              </View>
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
      <HomeStack.Screen
        name='Notification'
        component={NotificationScreen}
        options={({ navigation }) => {
          return {
            headerTitle: 'Notifikasi',
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                <NotificationBell />
              </View>
            ),
            headerTitleAlign: 'center',
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
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeNavigation' }],
    });
  };

  const handlePromo = (props) => {
    const { navigation } = props;
    navigation.navigate('ListPromo');
  };

  const handleJadwalDokter = (props) => {
    const { navigation } = props;
    navigation.navigate('ListPoliklinik');
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
                <>
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
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 15,
                    }}
                    onPress={() => handlePromo(props)}
                  >
                    <Text style={{ color: 'rgb(7,94,85)' }}>Promo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 15,
                    }}
                    onPress={() => handleJadwalDokter(props)}
                  >
                    <Text style={{ color: 'rgb(7,94,85)' }}>Jadwal Dokter</Text>
                  </TouchableOpacity>
                </>
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

export default HomeDrawerNavigator;
