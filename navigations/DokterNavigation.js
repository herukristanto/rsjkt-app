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
import { Layout, Text } from '@ui-kitten/components';

import { LOGOUT } from '../reducer/AppReducer';
import { AppContext } from '../context/AppContext';
import DokterScreen from '../screens/dokter/DokterScreen';
import ResetPasswordDokterScreen from '../screens/dokter/ResetPasswordDokterScreen';
import ListPraktekScreen from '../screens/dokter/ListPraktekScreen';

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
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeNavigation' }],
    });
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

export default DokterDrawerNavigator;
