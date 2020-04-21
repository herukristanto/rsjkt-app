import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { Layout, Button, Text, Avatar } from '@ui-kitten/components';
import moment from 'moment';

import { AppContext } from '../context/AppContext';
import { LOGOUT } from '../reducer/AppReducer';
import Divider from '../components/Divider';
import { getUnique } from '../utils/helpers';

const { width } = Dimensions.get('screen');

const dummyPasien = [
  {
    date: moment().format('DD/MM/YYYY'),
    name: 'Chandra Aridia',
    status: 1,
    jaminan: 'Telkom',
  },
  {
    date: moment().format('DD/MM/YYYY'),
    name: 'Ryo Martdiko',
    status: 1,
    jaminan: 'AIA',
  },
  {
    date: moment().add(1, 'days').format('DD/MM/YYYY'),
    name: 'Sapto Prabowo',
    status: 0,
  },
  {
    date: moment().add(1, 'days').format('DD/MM/YYYY'),
    name: 'Suryo Arief',
    status: 1,
    jaminan: 'Prudential',
  },
  {
    date: moment().add(1, 'days').format('DD/MM/YYYY'),
    name: 'Yuli',
    status: 0,
  },
  {
    date: moment().add(1, 'days').format('DD/MM/YYYY'),
    name: 'Rini',
    status: 1,
    jaminan: 'Inhealth',
  },
];

const DokterScreen = () => {
  const { state, dispatch } = useContext(AppContext);
  const [listPasien, setListPasien] = useState([]);

  useEffect(() => {
    const pasienUnique = getUnique(dummyPasien, 'date');
    const pasienDate = pasienUnique.map((date) => {
      return {
        date: date.date,
        pasien: dummyPasien.filter((dummy) => dummy.date == date.date),
      };
    });
    setListPasien(pasienDate);
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('_USERDATA_');
    dispatch({ type: LOGOUT });
  };

  const Pasien = ({ data }) => {
    return (
      <Layout
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
        }}
      >
        <Layout style={{ width: '60%' }}>
          <Text>{data.name}</Text>
        </Layout>
        <Layout>
          <Text>- {data.status ? data.jaminan : 'Umum'}</Text>
        </Layout>
      </Layout>
    );
  };

  const PasienDate = ({ pasien }) => {
    return (
      <Layout style={{ marginVertical: 5 }}>
        <Text style={{ fontWeight: 'bold' }}>{pasien.date}</Text>
        {pasien.pasien.map((data, index) => (
          <Pasien key={index} data={data} />
        ))}
      </Layout>
    );
  };

  return (
    <Layout style={styles.screen}>
      <Layout style={styles.card}>
        <Avatar
          source={{ uri: state.user.avatar }}
          width={width * 0.5}
          height={width * 0.5}
          style={styles.avatar}
        />
      </Layout>
      <Layout style={styles.card}>
        <Text category='h6' style={{ textAlign: 'center' }}>
          {state.user.namaDokter}
        </Text>
        <Text category='h6' style={{ textAlign: 'center' }}>
          Poli : {state.user.poli}
        </Text>
      </Layout>
      <Divider />
      <Layout style={styles.card}>
        <Text style={{ textAlign: 'center' }} category='p1'>
          Jumlah Pasien Hari ini : 2 Pasien
        </Text>
        <Text style={{ textAlign: 'center' }} category='p1'>
          Jumlah Pasien Besok : 4 Pasien
        </Text>
      </Layout>
      <Divider />
      <Layout style={[styles.card]}>
        {listPasien.map((pasien) => (
          <PasienDate key={pasien.date} pasien={pasien} />
        ))}
      </Layout>
      <Divider />
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
    marginVertical: 5,
  },
  avatar: {
    width: width * 0.5,
    height: width * 0.5,
    alignSelf: 'center',
  },
});

export default DokterScreen;
