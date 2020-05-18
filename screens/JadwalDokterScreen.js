import React, { useEffect, useState, useContext } from 'react';
import {
  Layout,
  Text,
  Spinner,
  Icon,
  Avatar,
  Button,
} from '@ui-kitten/components';
import {
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import moment from 'moment';

import { baseAxios } from '../utils/useAxios';
import { getUnique } from '../utils/helpers';
import Header from '../components/ListPoliklinikScreenComponent/Header';
import { AppContext } from '../context/AppContext';

const JadwalDokterScreen = () => {
  const { state: stateApp } = useContext(AppContext);
  const [daftarDokter, setDaftarDokter] = useState();
  const [dokterId, setDokterId] = useState();
  const [jadwalDokter, setJadwalDokter] = useState();
  const [rawJadwalDokter, setRawJadwalDokter] = useState();
  const [allDokter, setAllDokter] = useState();
  const [error, setError] = useState(false);
  const [title, setTitle] = useState('');
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    setTitle(route.params.data.poli_nm);
    setError(false);
    const loadPoli = async () => {
      try {
        const { data: dataPraktek } = await baseAxios.get('/daftar_praktek', {
          params: {
            key: 'rsjkt4231',
          },
        });
        const poliId = route.params.data.poli_id;
        const rawDokter = dataPraktek.filter(
          (dokter) => dokter.Poli_ID === poliId
        );
        const dokterUnique = getUnique(rawDokter, 'Dokter_nm');
        setRawJadwalDokter(rawDokter);
        setDaftarDokter(dokterUnique);
        setAllDokter(dokterUnique);
      } catch (error) {
        Alert.alert(
          'Error',
          'Something Wrong! Please contact customer service!'
        );
      }
    };
    loadPoli();
  }, []);

  const getJadwal = (data) => {
    setDokterId(data);
    const rawJadwal = rawJadwalDokter.filter(
      (jadwal) => jadwal.Dokter_ID === data
    );
    rawJadwal.sort(
      (a, b) =>
        new moment(a.Tanggal).format('YYYYMMDD') -
        new moment(b.Tanggal).format('YYYYMMDD')
    );
    setJadwalDokter(rawJadwal);
  };

  const onSearch = (value) => {
    if (value === '') {
      setDaftarDokter(allDokter);
    } else {
      const rawSearchDokter = allDokter.map((dokter) => {
        const checkPoli = dokter.Dokter_nm.trim()
          .toLowerCase()
          .includes(value.toLowerCase());
        if (checkPoli) {
          return dokter;
        }
      });
      const searchDokter = rawSearchDokter.filter(Boolean);
      setDaftarDokter(searchDokter);
    }
  };

  const handleRegistrasi = (data) => {
    if (!stateApp.isLogin) {
      Alert.alert(
        'Peringatan',
        'Anda Harus Login Terlebih Dahulu Untuk Registrasi Poli',
        [{ text: 'Oke' }]
      );
      return;
    }
    navigation.navigate('RegistrasiPoliklinik', {
      dataDokter: data,
    });
  };

  const handleShare = async (data) => {
    try {
      const result = await Share.share({
        message: `Hi! Buat janji dengan ${data.Dokter_nm.trim()} - Tanpa antri, langsung konsultasi. Klik https://google.com`,
      });
    } catch (error) {
      Alert.alert(
        'Error',
        'Something Wrong! Please Contact Customer Service!',
        [{ text: 'Oke' }]
      );
      return;
    }
  };

  if (!daftarDokter) {
    return (
      <Layout
        style={[
          styles.screen,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Spinner status='success' />
      </Layout>
    );
  }

  const RenderPoli = ({ data }) => {
    return (
      <Layout style={styles.container}>
        <Layout style={styles.dokterContainer}>
          <Layout style={styles.avatarContainer}>
            <Avatar
              source={{ uri: data.img }}
              width={30}
              height={30}
              style={styles.avatar}
            />
          </Layout>
          <Layout style={styles.namaContainer}>
            <Text category='h6' style={styles.dokterName}>
              {data.Dokter_nm.trim()}
            </Text>
            <Text style={styles.dokterDesc}>{data.Poli_nm.trim()}</Text>
            <Text style={styles.dokterDesc}>FK. Univ Airlangga 1995</Text>
            <Text style={styles.dokterDesc}>
              FK Spesialis Penyakit Dalam UI 2000
            </Text>
          </Layout>
          {/* <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => getJadwal(data.Dokter_ID)}
          >
            <Icon
              style={{ width: 24, height: 24 }}
              name='arrow-ios-downward'
              fill='rgb(7,94,85)'
            />
          </TouchableOpacity> */}
        </Layout>
        <Layout style={styles.footer}>
          <Layout style={styles.yearContainer}>
            <Icon name='briefcase' width={24} height={24} fill='#A0A0A0' />
            <Text>10 tahun</Text>
          </Layout>
          <Layout style={styles.buttonContainer}>
            <Button
              status='success'
              size='small'
              onPress={() => handleShare(data)}
            >
              SHARE
            </Button>
            <Button
              status='success'
              size='small'
              onPress={() => handleRegistrasi(data)}
            >
              REGISTRASI
            </Button>
          </Layout>
        </Layout>
        {/* {dokterId == data.Dokter_ID && (
          <Layout>
            <Layout
              key={data.Dokter_ID}
              style={{
                flex: 1,
                flexDirection: 'row',
              }}
            >
              <Layout style={[styles.th, { width: '25%' }]}>
                <Text>Hari</Text>
              </Layout>
              <Layout style={[styles.th, { width: '40%' }]}>
                <Text>Tanggal</Text>
              </Layout>
              <Layout style={[styles.th, { width: '35%' }]}>
                <Text>Jam</Text>
              </Layout>
            </Layout>
            {jadwalDokter.map((jadwal, index) => (
              <Layout key={index} style={{ flex: 1, flexDirection: 'row' }}>
                <Layout style={[styles.td, { width: '25%' }]}>
                  <Text
                    style={{ color: jadwal.TidakPraktek ? 'red' : 'black' }}
                  >
                    {moment(jadwal.Tanggal).format('dddd')}
                  </Text>
                </Layout>
                <Layout style={[styles.td, { width: '40%' }]}>
                  <Text
                    style={{ color: jadwal.TidakPraktek ? 'red' : 'black' }}
                  >
                    {moment(jadwal.Tanggal).format('DD MMMM YYYY')}
                  </Text>
                </Layout>
                <Layout style={[styles.td, { width: '35%' }]}>
                  <Text
                    style={{ color: jadwal.TidakPraktek ? 'red' : 'black' }}
                  >
                    {jadwal.Jam_AwalFix.trim()} - {jadwal.Jam_AkhirFix.trim()}
                  </Text>
                </Layout>
              </Layout>
            ))}
          </Layout>
        )} */}
      </Layout>
    );
  };

  return (
    <Layout style={styles.screen}>
      <Header onSearch={onSearch} title={title} placeholder='Cari Dokter...' />
      <ScrollView>
        {daftarDokter.map((dokter) => (
          <RenderPoli data={dokter} key={dokter.Dokter_ID} />
        ))}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    borderColor: '#A0A0A0',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    elevation: 5,
    backgroundColor: 'white',
  },
  dokterContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: 'white',
  },
  avatarContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '25%',
  },
  avatar: {
    margin: 8,
  },
  namaContainer: {
    justifyContent: 'center',
    width: '75%',
    backgroundColor: 'white',
  },
  dokterName: {
    marginLeft: 15,
  },
  dokterDesc: {
    marginLeft: 15,
    color: 'grey',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 8,
    backgroundColor: 'white',
  },
  yearContainer: {
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    backgroundColor: 'white',
  },
  iconContainer: {
    justifyContent: 'center',
    paddingHorizontal: 5,
    width: '15%',
  },
  th: {
    alignItems: 'center',
  },
  td: {
    paddingVertical: 5,
    alignItems: 'center',
  },
});

export default JadwalDokterScreen;
