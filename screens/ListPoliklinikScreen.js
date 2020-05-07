import React, { useEffect, useState } from 'react';
import { Layout, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { baseAxios } from '../utils/useAxios';
import Header from '../components/ListPoliklinikScreenComponent/Header';

const ListPoliklinikScreen = () => {
  const [polikliniks, setPolikliniks] = useState();
  const [allPoliklinik, setAllPoliklinik] = useState();
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setError(false);
    const loadPoli = async () => {
      try {
        const { data: dataPoli } = await baseAxios.get('/get', {
          params: {
            p: 'poli',
          },
        });
        setPolikliniks(dataPoli);
        setAllPoliklinik(dataPoli);
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
      setPolikliniks(allPoliklinik);
    } else {
      const rawSearchPoli = polikliniks.map((poli) => {
        const checkPoli = poli.poli_nm
          .toLowerCase()
          .includes(value.toLowerCase());
        if (checkPoli) {
          return poli;
        }
      });
      const searchPoli = rawSearchPoli.filter(Boolean);
      setPolikliniks(searchPoli);
    }
  };

  if (!polikliniks) {
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
      <TouchableOpacity
        onPress={() => navigation.navigate('JadwalDokter', { data: data })}
      >
        <Layout style={styles.poliContainer}>
          <Text category='h6' style={styles.poliName}>
            {data.poli_nm}
          </Text>
        </Layout>
      </TouchableOpacity>
    );
  };

  return (
    <Layout style={styles.screen}>
      <Header
        onSearch={onSearch}
        title='Pilih Klinik'
        placeholder='Cari Klinik...'
      />
      <ScrollView>
        {polikliniks.map((poli) => (
          <RenderPoli data={poli} key={poli.poli_id} />
        ))}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  poliContainer: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  poliName: {
    marginVertical: 10,
    marginLeft: 15,
  },
});

export default ListPoliklinikScreen;
