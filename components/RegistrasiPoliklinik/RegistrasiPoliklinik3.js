import React from 'react';
import { StyleSheet, Alert, Dimensions } from 'react-native';
import { Text, Layout, Button } from '@ui-kitten/components';
import QRCode from 'react-native-qrcode-svg';

const { width } = Dimensions.get('screen');

const RegistrasiPoliklinik3 = props => {
  const { setForm, setStep, form, navigation } = props;

  const handleForm = btn => {
    setForm({});
    setStep(0);
    if (btn === 'simpan') {
      Alert.alert('Berhasil', 'Berhasil Menyimpan Data', [
        {
          text: 'OK',
          onPress: () => navigation.popToTop()
        }
      ]);
    } else {
      navigation.popToTop();
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
        <QRCode value='https://github.com/granitebps' size={width * 0.5} />
      </Layout>
      <Layout style={styles.form}>
        <Text>{form.tanggal.toDateString()}</Text>
      </Layout>
      <Layout style={styles.form}>
        <Text>Lokasi : {form.poliklinik}</Text>
      </Layout>
      <Layout
        style={[
          styles.form,
          { flexDirection: 'row', justifyContent: 'space-between' }
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
    alignItems: 'center'
  },
  label: {
    color: '#778899',
    fontSize: 12
  }
});

export default RegistrasiPoliklinik3;
