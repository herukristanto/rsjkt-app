import React, { useEffect, useState, useContext } from 'react';
import { Layout, Text, Spinner, Button } from '@ui-kitten/components';
import { StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

import { baseAxios } from '../utils/useAxios';
import { AppContext } from '../context/AppContext';

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
            moment(a.Tgl_Pesan).format('YYYYMMDD') -
            moment(b.Tgl_Pesan).format('YYYYMMDD'),
        );

        setDataBooking(data.data);
        setLoading(false);
      } catch (error) {
        Alert.alert(
          'Error',
          'Something Wrong! Please Contact Customer Service!',
          [{ text: 'OK', onPress: () => navigation.popToTop() }],
        );
      }
    };
    getBooking();
    return () => {};
  }, []);

  const handleBatal = async (kodeBooking) => {
    try {
      const request = {
        key: 'rsjkt4231',
        kd_booking: kodeBooking,
        flag: 1,
      };
      await baseAxios.put('RegOL', request);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Something Wrong! Please Contact Customer Service!');
    }
  };

  const List = ({ data }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('SingleBooking', { data: data })}
      >
        <Layout style={styles.descContainer}>
          <Layout style={{ flexDirection: 'row' }}>
            <Text style={{ width: '30%', fontWeight: 'bold' }}>Poli</Text>
            <Text style={{ width: '70%', fontWeight: 'bold' }}>
              : {data.Poli_nm}
            </Text>
          </Layout>
          <Layout style={{ flexDirection: 'row' }}>
            <Text style={{ width: '30%', fontWeight: 'bold' }}>Dokter</Text>
            <Text style={{ width: '70%', fontWeight: 'bold' }}>
              : {data.Dokter_nm}
            </Text>
          </Layout>
          <Text>
            {moment(data.Tgl_Pesan).format('DD MMMM YYYY')}, {data.Jam}
          </Text>
          {data.Status && <Text>Info Dokter : {data.Status}</Text>}
        </Layout>
        <Layout style={styles.kodeBookingContainer}>
          <Text style={{ fontWeight: 'bold' }}>Kode Booking</Text>
          <Text style={{ fontWeight: 'bold' }}>{data.KodeBooking}</Text>
          <Button
            status="success"
            size="small"
            style={{ marginTop: 5 }}
            onPress={() =>
              Alert.alert('Peringatan', 'Yakin Untuk Membatalkan?', [
                { text: 'Yes', onPress: () => handleBatal(data.KodeBooking) },
                { text: 'No' },
              ])
            }
          >
            Batal
          </Button>
        </Layout>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Spinner status="success" />
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
  kodeBookingContainer: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BookingScreen;
