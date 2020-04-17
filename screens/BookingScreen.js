import React, { useEffect, useCallback, useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { Image, StyleSheet, AsyncStorage, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const BookingScreen = () => {
  const [antrian, setAntrian] = useState();

  const getQr = useCallback(async () => {
    const dataAntrian = await AsyncStorage.getItem('_USER_QR_CODE_');
    setAntrian(JSON.parse(dataAntrian));
  }, []);

  useEffect(() => {
    getQr();
    return () => {};
  }, []);

  return (
    <Layout style={styles.screen}>
      {antrian ? (
        <React.Fragment>
          <Layout style={styles.form}>
            <Text style={{ textDecorationLine: 'underline' }}>No Antrian</Text>
          </Layout>
          <Layout style={styles.form}>
            <Text category='h1'>{antrian.urut}</Text>
          </Layout>
          <Layout style={styles.form}>
            <Image
              source={{ uri: antrian.qrCode }}
              style={{ width: width * 0.5, height: width * 0.5 }}
            />
          </Layout>
          <Layout style={styles.form}>
            <Text>{antrian.tanggal}</Text>
          </Layout>
          <Layout style={styles.form}>
            <Text>Lokasi : {antrian.lokasi}</Text>
          </Layout>
        </React.Fragment>
      ) : (
        <Text>Data Tidak Ditemukan</Text>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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

export default BookingScreen;
