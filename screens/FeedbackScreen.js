import React, { useEffect, useState, useContext } from 'react';
import { Layout, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

import { baseAxios } from '../utils/useAxios';
import { AppContext } from '../context/AppContext';
import ModalFeedback from '../components/FeedbackScreenComponent/ModalFeedback';

const FeedbackScreen = () => {
  const [loading, setLoading] = useState(true);
  const [dataFeedback, setDataFeedback] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
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

        const { data } = await baseAxios.get('Feedback', {
          params: {
            rm: state.user.nomor_cm,
          },
        });

        data.data.sort(
          (a, b) =>
            new moment(new Date(a.Tgl_Pesan)).format('YYYYMMDD') -
            new moment(new Date(b.Tgl_Pesan)).format('YYYYMMDD')
        );

        setDataFeedback(data.data);
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

  const handleModal = (value) => {
    setShowModal(true);
    setDataModal(value);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const List = ({ data }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => handleModal(data)}>
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
        </Layout>
      </TouchableOpacity>
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

  if (dataFeedback.length === 0) {
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
      <ModalFeedback
        showModal={showModal}
        dataModal={dataModal}
        handleClose={handleClose}
      />

      <ScrollView>
        {dataFeedback.map((data) => (
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
  },
});

export default FeedbackScreen;
