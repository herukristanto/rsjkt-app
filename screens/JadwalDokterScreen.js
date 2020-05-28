import React, { useEffect, useState, useContext } from 'react';
import {
  Layout,
  Text,
  Spinner,
  Icon,
  Avatar,
  Button,
} from '@ui-kitten/components';
import { StyleSheet, Alert, ScrollView, Share } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import base64 from 'react-native-base64';

import { baseAxios } from '../utils/useAxios';
import Header from '../components/ListPoliklinikScreenComponent/Header';
import { AppContext } from '../context/AppContext';
import { objectToUrlEncoded } from '../utils/helpers';

const JadwalDokterScreen = () => {
  const { state: stateApp } = useContext(AppContext);
  const [rawDokter, setRawDokter] = useState();
  const [daftarDokter, setDaftarDokter] = useState();
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
        const poliId = route.params.data.poli_id;
        const { data: dataPraktek } = await baseAxios.get('/DrProfile', {
          params: {
            poli: poliId,
          },
        });

        const { data: dataRawDokter } = await baseAxios.get('/daftar_praktek', {
          params: {
            key: 'rsjkt4231',
          },
        });
        setRawDokter(dataRawDokter);
        setDaftarDokter(dataPraktek.Data);
        setAllDokter(dataPraktek.Data);
      } catch (error) {
        Alert.alert(
          'Error',
          'Something Wrong! Please contact customer service!'
        );
      }
    };
    loadPoli();
  }, []);

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
    const dokterFilterId = rawDokter.filter(
      (a) => a.Dokter_ID === data.Dokter_ID
    );
    if (dokterFilterId.length === 0) {
      Alert.alert(
        'Peringatan',
        'Dokter Yang Anda Pilih Belum Ada Jadwal Praktek',
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
      const dokterFilterId = rawDokter.filter(
        (a) => a.Dokter_ID === data.Dokter_ID
      );
      if (dokterFilterId.length === 0) {
        Alert.alert(
          'Peringatan',
          'Dokter Yang Anda Pilih Belum Ada Jadwal Praktek',
          [{ text: 'Oke' }]
        );
        return;
      }

      // const deepLink = Linking.makeUrl('regis-poli', {
      //   ...data,
      // });
      const queryString = objectToUrlEncoded(data);
      const deepLink = `intent:#Intent;scheme=rsjakarta:///regis-poli?${queryString};package=com.wamplo.rs_jakarta_mobile;end`;

      // const base64linking = base64.encode(deepLink);
      const base64linking = base64.encode(deepLink);

      // const url = `http://103.245.17.2:2080/rsjakartamobile?link=${base64linking}`;
      const url = `https://granitebps.com/rsjakartamobile?link=${base64linking}`;
      // const url = `https://granitebps.com/rsjakartamobile?env=${linking[0]}&dokter_id=${data.Dokter_ID}&poli_id=${data.Poli_ID}`;

      const result = await Share.share({
        message: `Hi! Buat janji dengan ${data.Dokter_nm.trim()} - Tanpa antri, langsung konsultasi. Klik ${url}`,
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
              source={{ uri: data.Img }}
              // width={30}
              // height={30}
              size='giant'
              style={styles.avatar}
            />
          </Layout>
          <Layout style={styles.namaContainer}>
            <Text category='h6' style={styles.dokterName}>
              {data.Dokter_nm.trim()}
            </Text>
            <Text style={styles.dokterDesc}>{data.Poli_nm.trim()}</Text>
            <Text style={styles.dokterDesc}>{data.S1}</Text>
            <Text style={styles.dokterDesc}>{data.S2}</Text>
          </Layout>
        </Layout>
        <Layout style={styles.footer}>
          <Layout style={styles.yearContainer}>
            <Icon name='briefcase' width={24} height={24} fill='#A0A0A0' />
            <Text>{data.LamaBekerjaTahun} tahun</Text>
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
    alignItems: 'center',
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
