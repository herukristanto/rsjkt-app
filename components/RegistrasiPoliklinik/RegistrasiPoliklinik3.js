import React, { useContext, useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  Alert,
  Dimensions,
  AsyncStorage,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import { Text, Layout, Icon } from '@ui-kitten/components';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import moment from 'moment';

import { AppContext } from '../../context/AppContext';
import { PoliklinikContext } from '../../context/PoliklinikContext';

const { width } = Dimensions.get('screen');

const RegistrasiPoliklinik3 = () => {
  const navigation = useNavigation();
  const { state: stateApp } = useContext(AppContext);
  const { state } = useContext(PoliklinikContext);
  const qrcode = useRef();
  const [qrBase64, setQrBase64] = useState();

  useEffect(() => {
    async function saveQrCode() {
      qrcode.current.toDataURL(async (data) => {
        const base64Icon = `data:image/png;base64,${data}`;
        const antrian = {
          qrCode: base64Icon,
          urut: 'A301',
          tanggal: state.form.tanggal,
          lokasi: state.daftarJadwal[0].poli,
        };
        await AsyncStorage.setItem('_USER_QR_CODE_', JSON.stringify(antrian));
        setQrBase64(data);
      });
    }
    saveQrCode();
  }, []);

  const handleHome = () => {
    navigation.popToTop();
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

      await FileSystem.writeAsStringAsync(file, qrBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });
      await MediaLibrary.saveToLibraryAsync(file);

      ToastAndroid.show('QR Code Berhasil Disimpan', ToastAndroid.SHORT);

      // JSON.stringify(data, null, 2);
      Alert.alert('Berhasil', JSON.stringify(state.form, null, 2));
    } catch (error) {
      Alert.alert('Error', JSON.stringify(error, null, 2));
    }
  };

  return (
    <React.Fragment>
      <Layout style={styles.form}>
        <Text category='h5' style={{ textDecorationLine: 'underline' }}>
          {stateApp.user.namaPasien}
        </Text>
      </Layout>
      <Layout style={styles.desc}>
        <Layout>
          <Text>Medical Record : {stateApp.user.nomor_cm}</Text>
        </Layout>
        <Layout>
          <Text>Poli Tujuan : {state.daftarJadwal[0].poli}</Text>
        </Layout>
        <Layout>
          <Text>
            Waktu Booking :{' '}
            {`${state.form.tanggal.hari}, ${state.form.tanggal.tanggal}`}
          </Text>
        </Layout>
        <Layout>
          <Text>No Antrian : A301</Text>
        </Layout>
      </Layout>
      <Layout style={styles.qrCode}>
        <QRCode
          value='https://github.com/granitebps'
          size={width * 0.5}
          getRef={qrcode}
        />
      </Layout>
      <Layout style={styles.form}>
        <Text>Kode Booking</Text>
      </Layout>
      <Layout style={styles.form}>
        <Text>Z5745Z</Text>
      </Layout>
      <Layout style={styles.icons}>
        <TouchableOpacity onPress={handleHome}>
          <Icon style={styles.icon} name='home-outline' />
        </TouchableOpacity>
        <TouchableOpacity>
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
  form: {
    width: '90%',
    marginVertical: 2,
    alignItems: 'center',
  },
  desc: {
    flex: 1,
    marginVertical: 2,
    width: '60%',
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
    marginTop: 20,
  },
  icon: {
    width: 32,
    height: 32,
  },
});

export default RegistrasiPoliklinik3;
