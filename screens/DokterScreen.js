import React, { useContext } from 'react';
import { StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { Layout, Button, Text, Card } from '@ui-kitten/components';

import { AppContext } from '../context/AppContext';
import { LOGOUT } from '../reducer/AppReducer';

const { width } = Dimensions.get('screen');

const DokterScreen = (props) => {
  const { navigation } = props;
  const { state, dispatch } = useContext(AppContext);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('_USERDATA_');
    dispatch({ type: LOGOUT });
  };

  return (
    <Layout style={styles.screen}>
      <Card style={styles.card}>
        <Text category='h5' style={{ textAlign: 'center' }} status='success'>
          Selamat Datang
        </Text>
        <Text category='h6' style={{ textAlign: 'center' }}>
          {state.user.namaDokter}
        </Text>
        <Text category='s1' style={{ textAlign: 'center' }}>
          Poli : {state.user.poli}
        </Text>
      </Card>
      <Card style={styles.card}>
        <Text style={{ textAlign: 'center' }} category='p1'>
          Jumlah Pasien Hari ini : 80 Pasien
        </Text>
        <Text style={{ textAlign: 'center' }} category='p1'>
          Jumlah Pasien Besok : 0 Pasien
        </Text>
      </Card>
      <Layout style={styles.form}>
        <Button onPress={handleLogout} status='success'>
          Logout
        </Button>
      </Layout>
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
    width: width * 0.8,
    marginVertical: 4,
  },
  card: {
    width: '90%',
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default DokterScreen;
