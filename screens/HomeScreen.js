import React, { useMemo, useContext } from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  AsyncStorage,
  Alert,
} from 'react-native';
import { Text, Avatar } from '@ui-kitten/components';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '../context/AppContext';
import { LOGOUT } from '../reducer/AppReducer';
import DokterScreen from './DokterScreen';
import Card from '../components/Card';
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

  const styl = useMemo(
    () =>
      StyleSheet.create({
        screen: {
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          paddingVertical: Constants.statusBarHeight,
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
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        },
        buttonText: {
          textAlign: 'center',
          color: 'white',
        },
      }),
    []
  );

  const linearColors = ['#ecf2f2', '#ecf2f2'];

  if (state.isLogin && state.user.role === 'dokter') {
    return <DokterScreen />;
  }

  return (
    <>
      <LinearGradient colors={linearColors} style={styl.screen}>
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

        {state.isLogin && <Text>Selamat Datang, {state.user.namaPasien}</Text>}

        <View style={styl.buttonContainer}>
          {!state.isLogin && (
            <Card onPressHandler={() => navigation.navigate('Login')}>
              <Avatar
                source={require('../assets/icon/registrasi-akun.png')}
                size='giant'
              />
              <Text style={styl.buttonText} category='h6' category='h6'>
                Registrasi Akun
              </Text>
            </Card>
          )}
          <Card onPressHandler={handlePoli}>
            <Avatar
              source={require('../assets/icon/registrasi-poli.png')}
              size='giant'
            />
            <Text style={styl.buttonText} category='h6'>
              Registrasi Poli
            </Text>
          </Card>
          <Card onPressHandler={() => {}}>
            <Avatar
              source={require('../assets/icon/cek-booking.png')}
              size='giant'
            />
            <Text style={styl.buttonText} category='h6'>
              Cek Booking
            </Text>
          </Card>
          <Card onPressHandler={() => {}}>
            <Avatar
              source={require('../assets/icon/lokasi.png')}
              size='giant'
            />
            <Text style={styl.buttonText} category='h6'>
              Lokasi
            </Text>
          </Card>
          {!state.isLogin && (
            <>
              <Card onPressHandler={() => navigation.navigate('Login')}>
                <Avatar
                  source={require('../assets/icon/login-pasien.png')}
                  size='giant'
                />
                <Text style={styl.buttonText} category='h6'>
                  Login Pasien
                </Text>
              </Card>
              <Card onPressHandler={() => navigation.navigate('LoginDokter')}>
                <Avatar
                  source={require('../assets/icon/login-dokter.png')}
                  size='giant'
                />
                <Text style={styl.buttonText} category='h6'>
                  Login Dokter
                </Text>
              </Card>
            </>
          )}
          {state.isLogin && (
            <Card onPressHandler={handleLogout}>
              <Avatar
                source={require('../assets/icon/logout.png')}
                size='giant'
              />
              <Text style={styl.buttonText} category='h6'>
                Logout
              </Text>
            </Card>
          )}
        </View>
      </LinearGradient>
    </>
  );
};

export default HomeScreen;
