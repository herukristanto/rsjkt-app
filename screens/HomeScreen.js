import React, { useContext, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Alert,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import { Layout } from '@ui-kitten/components';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import { useNavigation } from '@react-navigation/native';
import { Notifications } from 'expo';

import { AppContext } from '../context/AppContext';
import ButtonHome from '../components/HomeScreenComponent/ButtonHome';
import Slider from '../components/HomeScreenComponent/Slider';
import UserName from '../components/UserName';
import Promo from '../components/HomeScreenComponent/Promo';
import RunningText from '../components/HomeScreenComponent/RunningText';
import Header from '../components/HomeScreenComponent/Header';

const { height } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const { state } = useContext(AppContext);

  const urlRedirect = (event) => {
    const { url } = event;

    if (!url) return;

    const { path, queryParams } = Linking.parse(url);
    if (path === 'regis-poli') {
      if (state.isLogin) {
        navigation.navigate('RegistrasiPoliklinik', {
          dataDokter: queryParams,
        });
      } else {
        ToastAndroid.show('Silahkan Login Terlebih Dahulu', ToastAndroid.SHORT);
      }
    }
  };

  const handleNotification = (notification) => {
    console.log(notification);
  };

  useEffect(() => {
    // listen for new url events coming from Expo
    Linking.addEventListener('url', urlRedirect);

    const notificationSubs = Notifications.addListener(handleNotification);

    return () => {
      Linking.removeEventListener('url', urlRedirect);
    };
  });

  const handlePoli = () => {
    if (state.isLogin) {
      navigation.navigate('RegistrasiPoliklinik');
    } else {
      Alert.alert(
        'Peringatan',
        'Anda Harus Login Terlebih Dahulu Untuk Registrasi Poli'
      );
    }
  };

  const handleBooking = () => {
    if (state.isLogin) {
      navigation.navigate('Booking');
    } else {
      Alert.alert(
        'Peringatan',
        'Anda Harus Login Terlebih Dahulu Untuk Mengecek Pendaftaran'
      );
    }
  };

  const handleFeedback = () => {
    if (state.isLogin) {
      navigation.navigate('Feedback');
    } else {
      Alert.alert(
        'Peringatan',
        'Anda Harus Login Terlebih Dahulu Untuk Memberikan Feedback'
      );
    }
  };

  return (
    <Layout style={styl.screen}>
      <Header isLogin={state.isLogin} />

      <ScrollView style={{ height, marginBottom: 30 }}>
        <Slider />

        {state.isLogin && (
          <Layout style={{ marginLeft: 15 }}>
            <UserName name={state.user.namaPasien} />
          </Layout>
        )}

        <View style={styl.buttonContainer}>
          {state.isLogin && (
            <>
              <ButtonHome
                onPressHandler={handlePoli}
                label='Registrasi'
                avatar={require('../assets/icon/registrasi.png')}
              />
              <ButtonHome
                onPressHandler={handleBooking}
                label='Cek Pendaftaran'
                avatar={require('../assets/icon/cek-pendaftaran.png')}
              />
              <ButtonHome
                onPressHandler={handleFeedback}
                label='Ulasan'
                avatar={require('../assets/icon/feedback.png')}
              />
            </>
          )}
          <ButtonHome
            onPressHandler={() => navigation.navigate('ListPoliklinik')}
            label='Profile Dokter'
            avatar={require('../assets/icon/registrasi.png')}
          />
          <ButtonHome
            onPressHandler={() => navigation.navigate('Lokasi')}
            label='Lokasi'
            avatar={require('../assets/icon/lokasi.png')}
          />
          {!state.isLogin && (
            <ButtonHome
              onPressHandler={() => navigation.navigate('Login')}
              label='Login'
              avatar={require('../assets/icon/login.png')}
            />
          )}
        </View>

        <Promo />
      </ScrollView>

      <RunningText />
    </Layout>
  );
};

const styl = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf2f2',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  jadwalDokter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
});

export default HomeScreen;
