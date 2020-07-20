import React, { useState, useContext, useEffect } from 'react';
import { Layout, Text, Icon, Spinner, Button } from '@ui-kitten/components';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import NetInfo from '@react-native-community/netinfo';
import moment from 'moment';

import { AppContext } from '../../context/AppContext';
import { baseAxios } from '../../utils/useAxios';

const { width } = Dimensions.get('screen');

const dummyData = [
  {
    alasan: '',
    dokter_id: 368,
    dokter_nm: 'Adhi Wicaksono, SpM, dr.',
    kd_cuti: '20071636805',
    status_cuti: '5',
    tgl_cuti: [
      {
        tanggal: '2020-07-15 00:00:00.000',
      },
      {
        tanggal: '2020-07-16 00:00:00.000',
      },
      {
        tanggal: '2020-07-17 00:00:00.000',
      },
      {
        tanggal: '2020-07-18 00:00:00.000',
      },
      {
        tanggal: '2020-07-19 00:00:00.000',
      },
    ],
    tgl_input: '2020-07-17 13:41:57.000',
    tgl_status: '2020-07-18 00:00:00.000',
  },
  {
    alasan: '',
    dokter_id: 368,
    dokter_nm: 'Adhi Wicaksono, SpM, dr.',
    kd_cuti: '20071636806',
    status_cuti: '1',
    tgl_cuti: [
      {
        tanggal: '2020-07-15 00:00:00.000',
      },
      {
        tanggal: '2020-07-16 00:00:00.000',
      },
      {
        tanggal: '2020-07-17 00:00:00.000',
      },
      {
        tanggal: '2020-07-18 00:00:00.000',
      },
      {
        tanggal: '2020-07-19 00:00:00.000',
      },
    ],
    tgl_input: '2020-07-17 13:46:23.000',
    tgl_status: '2020-07-17 13:46:23.000',
  },
  {
    alasan: '',
    dokter_id: 368,
    dokter_nm: 'Adhi Wicaksono, SpM, dr.',
    kd_cuti: '20071636808',
    status_cuti: '1',
    tgl_cuti: [
      {
        tanggal: '2020-07-15 00:00:00.000',
      },
      {
        tanggal: '2020-07-16 00:00:00.000',
      },
      {
        tanggal: '2020-07-17 00:00:00.000',
      },
      {
        tanggal: '2020-07-18 00:00:00.000',
      },
      {
        tanggal: '2020-07-19 00:00:00.000',
      },
    ],
    tgl_input: '2020-07-17 16:17:02.000',
    tgl_status: '1900-01-01 00:00:00.000',
  },
];

const CutiDokterScreen = () => {
  const navigation = useNavigation();
  const { state } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [dataCuti, setDataCuti] = useState(dummyData);
  const [checked, setChecked] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        // Check internet connection
        const connect = await NetInfo.fetch();
        if (!connect.isConnected && !connect.isInternetReachable) {
          Alert.alert('Error', 'No Internet Connection', [
            { text: 'OK', onPress: () => navigation.goBack() },
          ]);
        }

        const { data } = await baseAxios.get('cutidr', {
          params: {
            key: 'rsjkt4231',
            dokter_id: state.user.idDokter,
          },
        });

        const result = data.filter((cuti) => cuti.status_cuti !== '5');

        setDataCuti(result);
      } catch (error) {
        console.log(error);
        Alert.alert(
          'Error',
          'Something Wrong! Please Contact Customer Service!',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      }

      setLoading(false);
    };
    // getData();
  });

  const getStatusCuti = (status) => {
    switch (status) {
      case '1':
        return 'Ajukan';
      case '2':
        return 'Proses';
      case '3':
        return 'Disetujui';
      case '4':
        return 'Ditolak';
      case '5':
        return 'Batal';
    }
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

  if (dataCuti.length === 0) {
    return (
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text>Data Tidak Ditemukan</Text>
      </Layout>
    );
  }

  const List = ({ data }) => {
    return (
      <Layout style={styles.card}>
        <Layout style={styles.descContainer}>
          <Layout style={{ flexDirection: 'row' }}>
            <Text style={{ width: '30%', fontWeight: 'bold' }}>No</Text>
            <Text style={{ width: '70%', fontWeight: 'bold' }}>
              : {data.kd_cuti}
            </Text>
          </Layout>
          <Layout style={{ flexDirection: 'row' }}>
            <Text style={{ width: '30%', fontWeight: 'bold' }}>Alasan</Text>
            <Text style={{ width: '70%', fontWeight: 'bold' }}>
              : {data.alasan}
            </Text>
          </Layout>
          <Layout style={{ flexDirection: 'row' }}>
            <Text style={{ width: '30%', fontWeight: 'bold' }}>Status</Text>
            <Text style={{ width: '70%', fontWeight: 'bold' }}>
              : {getStatusCuti(data.status_cuti)}
            </Text>
          </Layout>
          {checked === data.kd_cuti && (
            <Layout
              style={{
                flexDirection: 'row',
                marginTop: 15,
              }}
            >
              <Text style={{ width: '30%', fontWeight: 'bold' }}>
                Tanggal :
              </Text>
              <Layout>
                {data.tgl_cuti.map((tanggal) => (
                  <Text style={{ fontWeight: 'bold' }} key={tanggal.tanggal}>
                    {moment(tanggal.tanggal).format('DD-MM-YYYY')}
                  </Text>
                ))}
              </Layout>
            </Layout>
          )}
        </Layout>
        <Layout style={styles.iconContainer}>
          {checked === data.kd_cuti ? (
            <TouchableOpacity onPress={() => setChecked('')}>
              <Icon name='arrowhead-up-outline' width={32} height={32} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setChecked(data.kd_cuti)}>
              <Icon name='arrowhead-down-outline' width={32} height={32} />
            </TouchableOpacity>
          )}
        </Layout>
      </Layout>
    );
  };

  return (
    <Layout style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon style={{ width: 32, height: 32 }} fill='white' name='menu' />
          </TouchableOpacity>
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
      </View>

      <Layout style={styles.container}>
        <ScrollView>
          {dataCuti.map((data) => (
            <List data={data} key={data.kd_cuti} />
          ))}
        </ScrollView>
      </Layout>

      <Layout style={styles.footer}>
        <Layout style={styles.footerContainer}>
          <Button status='success'>Batal</Button>
          <Button
            status='success'
            onPress={() => navigation.navigate('TambahCutiDokter')}
          >
            Pengajuan
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  header: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgb(7,94,85)',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: width * 0.15,
  },
  card: {
    marginVertical: 5,
    marginHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  descContainer: {
    marginVertical: 2,
    width: '70%',
  },
  iconContainer: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 15,
  },
});

export default CutiDokterScreen;
