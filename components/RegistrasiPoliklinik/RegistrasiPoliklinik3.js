import React, { useContext } from 'react';
import { StyleSheet, Alert, Dimensions, AsyncStorage } from 'react-native';
import { Text, Layout, Button } from '@ui-kitten/components';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';

import { LOGOUT } from '../../reducer/AppReducer';
import { AppContext } from '../../context/AppContext';
import { RESET_FORM } from '../../reducer/PoliklinikReducer';
import { PoliklinikContext } from '../../context/PoliklinikContext';

const { width } = Dimensions.get('screen');

const RegistrasiPoliklinik3 = ({ setStep }) => {
  const navigation = useNavigation();
  const { dispatch } = useContext(AppContext);
  const { state, dispatch: dispatchPoli } = useContext(PoliklinikContext);

  const handleForm = async (btn) => {
    setStep(0);
    if (btn === 'simpan') {
      // JSON.stringify(data, null, 2)
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
        <QRCode value='https://github.com/granitebps' size={width * 0.5} />
      </Layout>
      <Layout style={styles.form}>
        <Text>{state.form.tanggal}</Text>
      </Layout>
      <Layout style={styles.form}>
        <Text>Lokasi : {state.form.poliklinik}</Text>
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
