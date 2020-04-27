import React, { useEffect, useState, useContext } from 'react';
import { Layout, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet, Dimensions, ScrollView, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import NetInfo from '@react-native-community/netinfo';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

import { baseAxios } from '../utils/useAxios';
import { AppContext } from '../context/AppContext';

const { width } = Dimensions.get('screen');

const BookingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [dataBooking, setDataBooking] = useState([]);
  const { state } = useContext(AppContext);
  const navigation = useNavigation();

  useEffect(() => {
    const getBooking = async () => {
      try {
        // Check internet connection
        const connect = await NetInfo.fetch();
        if (!connect.isConnected && !connect.isInternetReachable) {
          Alert.alert('Error', 'No Internet Connection', [
            { text: 'OK', onPress: () => navigation.popToTop() },
          ]);
        }

        const { data } = await baseAxios.get('RegOL', {
          params: {
            rm: state.user.nomor_cm,
          },
        });

        data.data.sort(
          (a, b) =>
            new moment(new Date(a.Tgl_Pesan)).format('YYYYMMDD') -
            new moment(new Date(b.Tgl_Pesan)).format('YYYYMMDD')
        );

        setDataBooking(data.data);
        setLoading(false);
      } catch (error) {
        Alert.alert(
          'Error',
          'Something Wrong! Please Contact Customer Service!',
          [{ text: 'OK', onPress: () => navigation.popToTop() }]
        );
      }
    };
    getBooking();
    return () => {};
  }, []);

  const List = ({ data }) => {
    return (
      <Layout style={styles.card}>
        <Layout style={[styles.container, { flexDirection: 'row' }]}>
          <Text style={{ width: width * 0.4 }}>Medical Record</Text>
          <Text style={{ width: width * 0.4 }}>: {data.Nomor_Cm}</Text>
        </Layout>
        <Layout style={[styles.container, { flexDirection: 'row' }]}>
          <Text style={{ width: width * 0.4 }}>Poli Tujuan</Text>
          <Text style={{ width: width * 0.4 }}>: {data.Poli_nm}</Text>
        </Layout>
        <Layout style={[styles.container, { flexDirection: 'row' }]}>
          <Text style={{ width: width * 0.4 }}>Waktu Booking</Text>
          <Text style={{ width: width * 0.4 }}>
            : {moment(new Date(data.Tgl_Pesan)).format('DD MMMM YYYY')}
          </Text>
        </Layout>
        <Layout style={[styles.container, { flexDirection: 'row' }]}>
          <Text style={{ width: width * 0.4 }}>No Antrian</Text>
          <Text style={{ width: width * 0.4 }}>: {data.NomorPanggil}</Text>
        </Layout>
        <Layout style={styles.qrCode}>
          <QRCode
            value={`${state.user.namaPasien}:${state.user.Tgl_lahir}:${data.Dokter_nm}:${data.Tgl_Pesan}:${data.Poli_nm}`}
            size={width * 0.65}
          />
        </Layout>
        <Layout style={styles.container}>
          <Text style={{ fontWeight: 'bold' }} category='h6'>
            Kode Booking
          </Text>
        </Layout>
        <Layout style={styles.container}>
          <Layout style={styles.bookingContainer}>
            <Text style={{ fontWeight: 'bold' }} category='h6'>
              {data.KodeBooking}
            </Text>
          </Layout>
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

  if (dataBooking.length === 0) {
    return (
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text>Data Tidak Ditemukan</Text>
      </Layout>
    );
  }

  return (
    <Layout style={styles.screen}>
      <ScrollView>
        {dataBooking.map((data) => (
          <List data={data} key={data.RegOL_ID} />
        ))}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginVertical: 5,
  },
  card: {
    marginVertical: 8,
    borderColor: '#ccc',
    borderWidth: 2,
    alignItems: 'center',
    marginHorizontal: 15,
    paddingVertical: 10,
  },
  container: {
    width: '70%',
    marginVertical: 2,
    alignItems: 'center',
  },
  qrCode: {
    marginVertical: 10,
    padding: 20,
    backgroundColor: 'white',
  },
  bookingContainer: {
    backgroundColor: 'white',
    width: '70%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#778899',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default BookingScreen;
