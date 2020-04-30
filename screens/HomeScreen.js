import React, { useContext } from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Text, Layout, Icon } from '@ui-kitten/components';
import Constants from 'expo-constants';
import RunningText from '../components/RunningText';

import { AppContext } from '../context/AppContext';
import ButtonHome from '../components/ButtonHome';
import Slider from '../components/Slider';
import UserName from '../components/UserName';
import Promo from '../components/Promo';

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
    <>
      <Layout style={styl.screen}>
        <View style={styl.header}>
          <View style={styl.menu}>
            {state.isLogin && (
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Icon
                  style={{ width: 32, height: 32 }}
                  fill='white'
                  name='menu'
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styl.title}>
            <Image
              source={require('../assets/images/login-image.png')}
              style={{ width: width * 0.09, height: width * 0.09 }}
            />
            <Text
              category='h6'
              numberOfLines={2}
              style={{ textAlign: 'center', marginLeft: 8, color: 'white' }}
            >
              RS Jakarta Mobile
            </Text>
          </View>
          <View style={styl.menu}>
            <TouchableOpacity onPress={() => {}}>
              <Icon
                style={{ width: 24, height: 24 }}
                fill='yellow'
                name='bell'
              />
            </TouchableOpacity>
          </View>
        </View>

        <Slider />

        {state.isLogin && (
          <Layout style={{ marginLeft: 15 }}>
            <UserName name={state.user.namaPasien} />
          </Layout>
        )}

        <View style={styl.buttonContainer}>
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
          <ButtonHome
            onPressHandler={() => {}}
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

        <RunningText />
      </Layout>
    </>
  );
};

const styl = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf2f2',
  },
  header: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgb(7,94,85)',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  menu: {
    // width: '15%',
  },
});

export default HomeScreen;
