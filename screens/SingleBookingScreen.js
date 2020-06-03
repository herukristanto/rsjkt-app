import React, { useContext, useState, useEffect, useRef } from 'react';
import { Layout, Text, Icon } from '@ui-kitten/components';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  ToastAndroid,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import QRCode from 'react-native-qrcode-svg';
import moment from 'moment';
import ViewShot from 'react-native-view-shot';

import UserName from '../components/UserName';
import { AppContext } from '../context/AppContext';

const { width } = Dimensions.get('screen');

const SingleBookingScreen = () => {
  const { state } = useContext(AppContext);
  const route = useRoute();
  const navigation = useNavigation();
  const data = route.params.data;
  const qrcode = useRef();
  const ssRef = useRef();
  const [ssBase64, setSsBase64] = useState();

  useEffect(() => {
    async function setSs() {
      const result = await ssRef.current.capture();
      setSsBase64(result);
    }
    setSs();
  }, []);

  const handleHome = () => {
    navigation.popToTop();
  };

  const handleShare = async () => {
    try {
      const share = await Sharing.isAvailableAsync();
      if (share) {
        await FileSystem.makeDirectoryAsync(
          `${FileSystem.cacheDirectory}qrcode`,
          {
            intermediates: true,
          }
        );

        const file = `${
          FileSystem.cacheDirectory
        }qrcode/qrcode-${moment().format('YYYY-MM-DD')}.png`;

        await FileSystem.writeAsStringAsync(file, ssBase64, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await Sharing.shareAsync(file);
      } else {
        Alert.alert('Error', 'Failed to share qr code', [{ text: 'OK' }]);
      }
    } catch (error) {
      Alert.alert('Error', 'Something Wrong! Please Contact Customer Service!');
    }
  };

  const handleSave = async () => {
    try {
      const {
        status: existingStatus,
      } = await MediaLibrary.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Error', 'Failed to save qr code to gallery', [
          { text: 'OK' },
        ]);
        return;
      }

      await FileSystem.makeDirectoryAsync(
        `${FileSystem.cacheDirectory}qrcode`,
        {
          intermediates: true,
        }
      );

      const file = `${FileSystem.cacheDirectory}qrcode/qrcode-${moment().format(
        'YYYY-MM-DD'
      )}.png`;

      await FileSystem.writeAsStringAsync(file, ssBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });
      await MediaLibrary.saveToLibraryAsync(file);

      ToastAndroid.show('QR Code Berhasil Disimpan', ToastAndroid.SHORT);
    } catch (error) {
      Alert.alert('Error', 'Something Wrong! Please Contact Customer Service!');
    }
  };

  return (
    <Layout style={styles.screen}>
      <UserName name={state.user.namaPasien} style={styles.username} />
      <ViewShot
        ref={ssRef}
        options={{ result: 'base64' }}
        style={styles.container}
      >
        <Layout style={styles.descContainer}>
          <Layout style={styles.desc}>
            <Text style={{ width: width * 0.35 }}>Medical Record</Text>
            <Text style={{ width: width * 0.65 }}>: {data.Nomor_Cm}</Text>
          </Layout>
          <Layout style={styles.desc}>
            <Text style={{ width: width * 0.35 }}>Poli Tujuan</Text>
            <Text style={{ width: width * 0.65 }}>: {data.Poli_nm}</Text>
          </Layout>
          <Layout style={styles.desc}>
            <Text style={{ width: width * 0.35 }}>Waktu Booking</Text>
            <Text style={{ width: width * 0.65 }}>
              : {moment(data.Tgl_Pesan).format('dddd, DD MMMM YYYY')}
            </Text>
          </Layout>
          <Layout style={styles.desc}>
            <Text style={{ width: width * 0.35 }}>No Antrian</Text>
            <Text style={{ width: width * 0.65 }}>: {data.NomorPanggil}</Text>
          </Layout>
        </Layout>
        <Layout style={styles.qrCode}>
          <QRCode
            value={data.KodeBooking}
            size={width * 0.7}
            getRef={qrcode}
          />
        </Layout>
        <Text category='h5' style={{ fontWeight: 'bold' }}>
          Kode Booking
        </Text>
        <Layout style={styles.bookingContainer}>
          <Text style={{ fontWeight: 'bold' }} category='h6'>
            {data.KodeBooking}
          </Text>
        </Layout>
      </ViewShot>
      <Layout style={styles.icons}>
        <TouchableOpacity onPress={handleHome}>
          <Icon style={styles.icon} name='home-outline' />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <Icon style={styles.icon} name='share' />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave}>
          <Icon style={styles.icon} name='download' />
        </TouchableOpacity>
      </Layout>
      <Layout style={styles.footer}>
        <Image
          source={require('../assets/images/login-image.png')}
          style={{ width: width * 0.07, height: width * 0.07 }}
        />
        <Text style={styles.footerText}>RS Jakarta Mobile</Text>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  username: {
    backgroundColor: 'white',
    width,
    paddingLeft: 20,
    marginBottom: 10,
  },
  descContainer: {
    alignItems: 'center',
  },
  desc: {
    width: width * 0.7,
    flexDirection: 'row',
  },
  qrCode: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: 'white',
  },
  bookingContainer: {
    backgroundColor: 'white',
    width: '70%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#778899',
    borderWidth: 2,
    borderRadius: 5,
  },
  icons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
  },
  icon: {
    width: 32,
    height: 32,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#075e55',
    paddingVertical: 5,
    width: width,
    bottom: 0,
    position: 'absolute',
  },
  footerText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
  },
});

export default SingleBookingScreen;
