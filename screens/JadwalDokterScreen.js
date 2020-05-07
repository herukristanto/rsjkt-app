import React, { useEffect, useState } from 'react';
import { Layout, Text, Spinner, Icon, Avatar } from '@ui-kitten/components';
import { StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';

import { baseAxios } from '../utils/useAxios';
import { getUnique } from '../utils/helpers';
import Header from '../components/ListPoliklinikScreenComponent/Header';

const JadwalDokterScreen = () => {
  const [daftarDokter, setDaftarDokter] = useState();
  const [dokterId, setDokterId] = useState();
  const [jadwalDokter, setJadwalDokter] = useState();
  const [rawJadwalDokter, setRawJadwalDokter] = useState();
  const [allDokter, setAllDokter] = useState();
  const [error, setError] = useState(false);
  const [title, setTitle] = useState('');
  const route = useRoute();

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
          </Layout>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => getJadwal(data.Dokter_ID)}
          >
            <Icon
              style={{ width: 24, height: 24 }}
              name='arrow-ios-downward'
              fill='rgb(7,94,85)'
            />
          </TouchableOpacity>
        </Layout>
        {dokterId == data.Dokter_ID && (
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
        )}
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
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  dokterContainer: {
    flexDirection: 'row',
  },
  avatarContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: 8,
  },
  namaContainer: {
    justifyContent: 'center',
    width: '75%',
  },
  dokterName: {
    marginVertical: 10,
    marginLeft: 15,
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
