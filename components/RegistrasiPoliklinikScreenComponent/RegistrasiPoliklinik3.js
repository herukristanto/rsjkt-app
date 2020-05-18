import React, { useContext, useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  Alert,
  Dimensions,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import { Text, Layout, Icon } from '@ui-kitten/components';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import moment from 'moment';
import * as Sharing from 'expo-sharing';
import base64 from 'react-native-base64';
import ViewShot from 'react-native-view-shot';

import { AppContext } from '../../context/AppContext';
import { PoliklinikContext } from '../../context/PoliklinikContext';

const { width } = Dimensions.get('screen');

const RegistrasiPoliklinik3 = () => {
  const navigation = useNavigation();
  const { state: stateApp } = useContext(AppContext);
  const { state } = useContext(PoliklinikContext);
  const qrcode = useRef();
  const ssRef = useRef();
  const [ssBase64, setSsBase64] = useState();

  // Testing Only
  // const encode = base64.encode(
  //   'ATET AKHMADSARI:1979-05-06:Vika Novia Zamri, Drg, Sp Ort.:2020-04-24'
  // );

  useEffect(() => {
    navigation.setParams({ title: 'QR CODE' });
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
      Alert.alert('Error', JSON.stringify(error, null, 2), [{ text: 'OK' }]);
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

      ToastAndroid.show('Tersimpan di Galeri', ToastAndroid.SHORT);
    } catch (error) {
      Alert.alert('Error', 'Something Wrong! Please Contact Customer Service!');
    }
  };

  return (
    <React.Fragment>
      <ViewShot
        ref={ssRef}
        options={{ result: 'base64' }}
        style={styles.container}
      >
        <Layout style={[styles.desc, { flexDirection: 'row' }]}>
          <Text style={{ width: width * 0.4 }}>Medical Record</Text>
          <Text style={{ width: width * 0.5 }}>: {stateApp.user.nomor_cm}</Text>
        </Layout>
        <Layout style={[styles.desc, { flexDirection: 'row' }]}>
          <Text style={{ width: width * 0.4 }}>Poli Tujuan</Text>
          <Text style={{ width: width * 0.4 }}>
            : {state.daftarDokter[0].Poli_nm.trim()}
          </Text>
        </Layout>
        <Layout style={[styles.desc, { flexDirection: 'row' }]}>
          <Text style={{ width: width * 0.4 }}>Waktu Booking</Text>
          <Text style={{ width: width * 0.5 }}>
            {`: ${state.form.tanggal.hari}, ${moment(
              state.form.tanggal.date
            ).format('DD MMMM YYYY')}`}
          </Text>
        </Layout>
        <Layout style={[styles.desc, { flexDirection: 'row' }]}>
          <Text style={{ width: width * 0.4 }}>No Antrian</Text>
          <Text style={{ width: width * 0.5 }}>: {state.noAntrian}</Text>
        </Layout>
        <Layout style={styles.qrCode}>
          <QRCode
            // value={encode}
            value={state.form.qrCode}
            size={width * 0.65}
            getRef={qrcode}
          />
        </Layout>
        <Layout style={styles.form}>
          <Text style={{ fontWeight: 'bold' }} category='h6'>
            Kode Booking
          </Text>
        </Layout>
        <Layout style={styles.form}>
          <Layout style={styles.bookingContainer}>
            <Text style={{ fontWeight: 'bold' }} category='h6'>
              {state.kodeBooking}
            </Text>
          </Layout>
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
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  form: {
    width: '70%',
    marginVertical: 2,
    alignItems: 'center',
  },
  desc: {
    marginVertical: 2,
    width: '70%',
  },
  label: {
    color: '#778899',
    fontSize: 12,
  },
  qrCode: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: 'white',
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
  bookingContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#778899',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default RegistrasiPoliklinik3;
