import React, { useContext } from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Text, Layout, Icon } from '@ui-kitten/components';
import Constants from 'expo-constants';

import { AppContext } from '../context/AppContext';
import DokterScreen from './DokterScreen';
import ButtonHome from '../components/ButtonHome';
import Slider from '../components/Slider';

const { width } = Dimensions.get('screen');

const HomeScreen = (props) => {
  const { navigation } = props;
  const { state } = useContext(AppContext);

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
          <View style={styl.header}>
            <View style={styl.menu}>
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Icon
                  style={{ width: 32, height: 32 }}
                  fill='white'
                  name='menu'
                />
              </TouchableOpacity>
            </View>
            <View style={styl.title}>
              <Image
                source={require('../assets/images/login-image.png')}
                style={{ width: width * 0.15, height: width * 0.15 }}
              />
              <Text
                category='h4'
                numberOfLines={2}
                style={{ textAlign: 'center', marginLeft: 8, color: 'white' }}
              >
                RS Jakarta Mobile
              </Text>
            </View>
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
  header: {
    paddingVertical: 10,
    backgroundColor: 'rgb(7,94,85)',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  menu: {
    paddingLeft: 15,
    width: '15%',
  },
});

export default HomeScreen;
