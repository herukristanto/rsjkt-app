import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  AsyncStorage,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Layout, Text, Avatar, Spinner, Icon } from '@ui-kitten/components';
import moment from 'moment';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

import { AppContext } from '../../context/AppContext';
import { LOGOUT } from '../../reducer/AppReducer';
import { getUnique } from '../../utils/helpers';
import { baseAxios } from '../../utils/useAxios';

const { width } = Dimensions.get('screen');

const DokterScreen = () => {
  const { state, dispatch } = useContext(AppContext);
  const [listPasien, setListPasien] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const getPasien = async () => {
      try {
        const { data } = await baseAxios('RegOL', {
          params: {
            dokter_id: state.user.idDokter,
          },
        });
        const { data: dataJadwal } = await baseAxios.get('/daftar_praktek', {
          params: {
            key: 'rsjkt4231',
          },
        });
        const dokterFilterId = dataJadwal.filter(
          (a) => a.Dokter_ID === state.user.idDokter && a.Poli_ID === state.user.idPoli
        );
        dokterFilterId.sort(
          (a, b) =>
            new moment(a.Tanggal).format('YYYYMMDD') -
            new moment(b.Tanggal).format('YYYYMMDD')
        );

        const pasienDate = dokterFilterId.map((date) => {
          return {
            date: date.Tanggal,
            pasien: data.data.filter(
              (pasien) => moment(pasien.Tgl_Pesan).isSame(date.Tanggal, 'day')
            ),
          };
        });
        setListPasien(pasienDate);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPasien();
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
          <Text>{data.NamaPasien}</Text>
        </Layout>
        <Layout>
          <Text>- {data.Jenis_Penjamin}</Text>
        </Layout>
      </Layout>
    );
  };

  const PasienDate = ({ pasien }) => {
    return (
      <Layout style={{ marginVertical: 5 }}>
        <Layout style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold', width: '60%' }}>
            {moment(pasien.date).format('DD/MM/YYYY')}
          </Text>
          <Text style={{ fontWeight: 'bold' }}>
            Total: {pasien.pasien.length}
          </Text>
        </Layout>
        <Layout>
          {pasien.pasien.map((data, index) => (
            <Pasien key={index} data={data} />
          ))}
        </Layout>
      </Layout>
    );
  };

  if (loading) {
    return (
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Spinner status='success' />
      </Layout>
    );
  }

  return (
    <Layout style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.menu}>
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
        <View style={styles.title}>
          <Image
            source={require('../../assets/images/login-image.png')}
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
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => {}}>
            <Icon style={{ width: 24, height: 24 }} fill='yellow' name='bell' />
          </TouchableOpacity>
        </View>
      </View>

      <Layout style={{ width: '100%', height: '90%' }}>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
          <Layout style={styles.avatarContainer}>
            <Avatar
              source={{ uri: state.user.avatar }}
              width={width * 0.3}
              height={width * 0.3}
              style={styles.avatar}
            />
          </Layout>

          <Layout style={styles.identity}>
            <Text category='h6' style={{ textAlign: 'center' }}>
              {state.user.namaDokter}
            </Text>
            <Text category='h6' style={{ textAlign: 'center' }}>
              Poli : {state.user.poli}
            </Text>
          </Layout>

          <Layout style={[styles.card]}>
            {listPasien.map((pasien) => (
              <PasienDate key={pasien.date} pasien={pasien} />
            ))}
          </Layout>
        </ScrollView>
      </Layout>

      <Layout style={styles.footer}>
        <Layout style={styles.container}>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.footerText}>Logout</Text>
          </TouchableOpacity>
          <Layout style={styles.footerDivider}></Layout>
          <TouchableOpacity onPress={() => navigation.navigate('ListPraktek')}>
            <Text style={styles.footerText}>Update</Text>
          </TouchableOpacity>
        </Layout>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    alignItems: 'center',
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
  identity: {
    width: '90%',
    marginVertical: 5,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  card: {
    width: '90%',
    marginVertical: 5,
  },
  avatarContainer: {
    width: '90%',
    marginVertical: 5,
    marginTop: 15,
  },
  avatar: {
    width: width * 0.3,
    height: width * 0.3,
    alignSelf: 'center',
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#075e55',
  },
  footerText: {
    color: 'white',
    fontSize: 16,
    padding: 8,
  },
  footerDivider: {
    backgroundColor: 'white',
    width: 1,
    height: '100%',
  },
});

export default DokterScreen;
