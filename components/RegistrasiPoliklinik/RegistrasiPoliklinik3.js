import React, { useContext, useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  Alert,
  Dimensions,
  AsyncStorage,
  ToastAndroid,
} from 'react-native';
import { Text, Layout, Button } from '@ui-kitten/components';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import moment from 'moment';

import { LOGOUT } from '../../reducer/AppReducer';
import { AppContext } from '../../context/AppContext';
import { RESET_FORM } from '../../reducer/PoliklinikReducer';
import { PoliklinikContext } from '../../context/PoliklinikContext';

const { width } = Dimensions.get('screen');

const RegistrasiPoliklinik3 = ({ setStep }) => {
  const navigation = useNavigation();
  const { dispatch } = useContext(AppContext);
  const { state, dispatch: dispatchPoli } = useContext(PoliklinikContext);
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

  const handleForm = async (btn) => {
    try {
      if (btn === 'simpan') {
        const file = `${
          FileSystem.documentDirectory
        }qrcode/qrcode-${moment().format('YYYY-MM-DD')}.png`;

        await FileSystem.writeAsStringAsync(file, qrBase64, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await MediaLibrary.saveToLibraryAsync(file);

        ToastAndroid.show('QR Code Berhasil Disimpan', ToastAndroid.SHORT);

        setStep(0);

        // JSON.stringify(data, null, 2);
        Alert.alert('Berhasil', JSON.stringify(state.form, null, 2), [
          {
            text: 'OK',
            onPress: () => navigation.popToTop(),
          },
        ]);
      } else {
        await AsyncStorage.removeItem('_USERDATA_');
        dispatch({ type: LOGOUT });
        navigation.popToTop();
      }
      dispatchPoli({
        type: RESET_FORM,
      });
    } catch (error) {
      Alert.alert('Error', 'Something Wrong! Please Contact Customer Service!');
    }
  };

  return (
    <React.Fragment>
      <Layout style={styles.form}>
        <Text style={{ textDecorationLine: 'underline' }}>No Antrian</Text>
      </Layout>
      <Layout style={styles.form}>
        <Text category='h1'>A301</Text>
      </Layout>
      <Layout style={styles.form}>
        <QRCode
          value='https://github.com/granitebps'
          size={width * 0.5}
          getRef={qrcode}
        />
      </Layout>
      <Layout style={styles.form}>
        <Text>{state.form.tanggal}</Text>
      </Layout>
      <Layout style={styles.form}>
        <Text>Lokasi : {state.daftarJadwal[0].poli}</Text>
      </Layout>
      <Layout
        style={[
          styles.form,
          { flexDirection: 'row', justifyContent: 'space-between' },
        ]}
      >
        <Button
          status='success'
          onPress={() => handleForm('logout')}
          style={{ width: '45%' }}
        >
          Logout
        </Button>
        <Button
          status='success'
          onPress={() => handleForm('simpan')}
          style={{ width: '45%' }}
        >
          Simpan
        </Button>
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
  label: {
    color: '#778899',
    fontSize: 12,
  },
});

export default RegistrasiPoliklinik3;
