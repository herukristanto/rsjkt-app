import React, { useContext } from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  AsyncStorage,
  Alert,
  ScrollView,
} from 'react-native';
import { Text, Layout } from '@ui-kitten/components';
import Constants from 'expo-constants';
import { AppContext } from '../context/AppContext';
import { LOGOUT } from '../reducer/AppReducer';
import DokterScreen from './DokterScreen';
import ButtonHome from '../components/ButtonHome';
import Slider from '../components/Slider';

const { width } = Dimensions.get('screen');

const HomeScreen = (props) => {
  const { navigation } = props;
  const { state, dispatch } = useContext(AppContext);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('_USERDATA_');
    dispatch({ type: LOGOUT });
  };

  const handlePoli = () => {
    if (state.isLogin) {
      navigation.navigate('RegistrasiPoliklinik');
    } else {
      Alert.alert(
        'Peringatan',
        'Anda Harus Login Terlebih Dahulu Untuk Registrasi Poli',
        [{ text: 'Oke' }]
      );
    }
  };

  if (state.isLogin && state.user.role === 'dokter') {
    return <DokterScreen />;
  }

  return (
    <>
      <Layout style={styl.screen}>
        <ScrollView>
          <View style={styl.title}>
            <Image
              source={require('../assets/images/login-image.png')}
              style={{ width: width * 0.15, height: width * 0.15 }}
            />
            <Text
              category='h2'
              numberOfLines={2}
              style={{ textAlign: 'center', marginLeft: 8, color: 'white' }}
            >
              RS Jakarta Mobile
            </Text>
          </View>

          <Slider />

          {state.isLogin && (
            <Text style={{ textAlign: 'center', marginTop: 5 }}>
              Selamat Datang, {state.user.namaPasien}
            </Text>
          )}

          <View style={styl.buttonContainer}>
            {!state.isLogin && (
              <ButtonHome
                onPressHandler={() => navigation.navigate('Login')}
                label='Registrasi Akun'
                avatar={require('../assets/icon/registrasi-akun.png')}
              />
            )}
            <ButtonHome
              onPressHandler={handlePoli}
              label='Registrasi Poli'
              avatar={require('../assets/icon/registrasi-poli.png')}
            />
            <ButtonHome
              onPressHandler={() => navigation.navigate('Booking')}
              label='Cek Booking'
              avatar={require('../assets/icon/cek-booking.png')}
            />
            <ButtonHome
              onPressHandler={() => {}}
              label='Lokasi'
              avatar={require('../assets/icon/lokasi.png')}
            />
            {!state.isLogin && (
              <ButtonHome
                onPressHandler={() => navigation.navigate('Login')}
                avatar={require('../assets/icon/login-pasien.png')}
                label='Login'
              />
            )}
            {state.isLogin && (
              <ButtonHome
                onPressHandler={handleLogout}
                label='Logout'
                avatar={require('../assets/icon/logout.png')}
              />
            )}
          </View>
        </ScrollView>
      </Layout>
    </>
  );
};

const styl = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf2f2',
  },
  title: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(7,94,85)',
    width: '100%',
  },
  buttonContainer: {
    alignItems: 'center',
  },
});

export default HomeScreen;
