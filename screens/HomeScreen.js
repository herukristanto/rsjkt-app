import React, { useContext } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Text, Layout, Icon } from '@ui-kitten/components';
import Constants from 'expo-constants';

import { AppContext } from '../context/AppContext';
import ButtonHome from '../components/HomeScreenComponent/ButtonHome';
import Slider from '../components/HomeScreenComponent/Slider';
import UserName from '../components/UserName';
import Promo from '../components/HomeScreenComponent/Promo';
import RunningText from '../components/HomeScreenComponent/RunningText';
import Header from '../components/HomeScreenComponent/Header';

const { height } = Dimensions.get('window');

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

  const handleBooking = () => {
    if (state.isLogin) {
      navigation.navigate('Booking');
    } else {
      Alert.alert(
        'Peringatan',
        'Anda Harus Login Terlebih Dahulu Untuk Mengecek Pendaftaran',
        [{ text: 'Oke' }]
      );
    }
  };

  const handleFeedback = () => {
    if (state.isLogin) {
      navigation.navigate('Feedback');
    } else {
      Alert.alert(
        'Peringatan',
        'Anda Harus Login Terlebih Dahulu Untuk Memberikan Feedback',
        [{ text: 'Oke' }]
      );
    }
  };

  return (
    <Layout style={styl.screen}>
      <Header isLogin={state.isLogin} />

      <ScrollView style={{ height: height, marginBottom: 30 }}>
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
                label='Feedback'
                avatar={require('../assets/icon/feedback.png')}
              />
            </>
          )}
          {state.isLogin && (
            <ButtonHome
              onPressHandler={() => navigation.navigate('ListPoliklinik')}
              label='Profile Dokter'
              avatar={require('../assets/icon/registrasi.png')}
            />
          )}
          <ButtonHome
            onPressHandler={() => navigation.navigate('Lokasi')}
            // onPressHandler={() => {}}
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

        {!state.isLogin && (
          <TouchableOpacity
            style={styl.jadwalDokter}
            onPress={() => navigation.navigate('ListPoliklinik')}
          >
            <Layout>
              <Text style={{ fontWeight: 'bold' }}>Jadwal Dokter</Text>
              <Text style={{ fontSize: 12 }}>
                Jadwal Dokter Rumah Sakit Jakarta
              </Text>
            </Layout>
            <Layout>
              <Icon
                style={{ width: 24, height: 24 }}
                name='arrow-ios-forward'
                fill='rgb(7,94,85)'
              />
            </Layout>
          </TouchableOpacity>
        )}
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
