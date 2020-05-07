import React, { useContext, useEffect, useState } from 'react';
import { Text, Layout, Avatar, Spinner, Button } from '@ui-kitten/components';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

import Header from '../components/Header';
import { AppContext } from '../context/AppContext';
import { baseAxios } from '../utils/useAxios';
import ModalStatus from '../components/ListPraktekScreenComponent/ModalStatus';

const { width } = Dimensions.get('screen');

const ListPraktekScreen = () => {
  const { state } = useContext(AppContext);
  const [jadwal, setJadwal] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const getJadwal = async () => {
      try {
        // Check internet connection
        const connect = await NetInfo.fetch();
        if (!connect.isConnected && !connect.isInternetReachable) {
          Alert.alert('Error', 'No Internet Connection', [{ text: 'Retry' }]);
          return;
        }

        const { data } = await baseAxios.get('/daftar_praktek', {
          params: {
            key: 'rsjkt4231',
          },
        });

        const daftarJadwal = data.filter(
          (dokter) =>
            dokter.Dokter_ID === state.user.idDokter &&
            dokter.Poli_nm.trim() === state.user.poli
        );
        daftarJadwal.sort(
          (a, b) =>
            new moment(a.Tanggal).format('YYYYMMDD') -
            new moment(b.Tanggal).format('YYYYMMDD')
        );

        setJadwal(daftarJadwal);
      } catch (error) {
        console.log(error);
      }
    };
    getJadwal();
  }, []);

  const handleModal = (data) => {
    setDataModal(data);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const JadwalItem = ({ data }) => {
    return (
      <TouchableOpacity style={styles.jadwal} onPress={() => handleModal(data)}>
        <Text>{moment(data.Tanggal).format('DD/MM/YYYY')}</Text>
        {data.Status && (
          <Avatar source={require('../assets/icon/status.png')} size='medium' />
        )}
      </TouchableOpacity>
    );
  };

  if (jadwal.length === 0) {
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
      <Header />

      {showModal && (
        <ModalStatus
          showModal={showModal}
          dataModal={dataModal}
          handleClose={handleClose}
        />
      )}

      <Layout style={{ flex: 1, width: '100%', marginVertical: 10 }}>
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

          <Layout style={styles.card}>
            {jadwal.map((data) => (
              <JadwalItem key={data.Praktek_ID} data={data} />
            ))}
          </Layout>
          <Button status='success' onPress={() => navigation.goBack()}>
            Back
          </Button>
        </ScrollView>
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
  jadwal: {
    flexDirection: 'row',
    marginVertical: 15,
    paddingBottom: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ListPraktekScreen;
