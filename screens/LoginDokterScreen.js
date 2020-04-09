import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Image,
  Alert,
  AsyncStorage,
} from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components';
import { Formik } from 'formik';

import InputButton from '../components/InputButton';
import InputText from '../components/InputText';
import useAxios from '../utils/useAxios';
import { getUnique } from '../utils/helpers';
import { LOGIN } from '../reducer/AppReducer';
import { AppContext } from '../context/AppContext';

const { width } = Dimensions.get('screen');

const LoginDokterScreen = (props) => {
  const { navigation } = props;
  const [listDokter, setListDokter] = useState([]);
  const { dispatch } = useContext(AppContext);

  const [, getDokter] = useAxios(
    { url: '/daftar_praktek', method: 'GET' },
    { manual: true }
  );

  const getDaftar = useCallback(async () => {
    try {
      const { data } = await getDokter({ params: { key: 'rsjkt4231' } });
      // console.log('request');

      const dokterUnique = await getUnique(data, 'Dokter_ID');
      setListDokter(dokterUnique);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getDaftar();
    return () => {};
  }, [getDaftar]);

  const handleForm = async (values) => {
    try {
      const dataDokter = listDokter.find(
        (dokter) => dokter.Dokter_ID == values.kodeDokter
      );

      if (dataDokter === undefined) {
        Alert.alert('Maaf', 'Data Dokter Tidak Ditemukan');
        return;
      }

      const userData = {
        namaDokter: dataDokter.Dokter_nm.trim(),
        poli: dataDokter.Poli_nm.trim(),
        role: 'dokter',
      };
      await AsyncStorage.setItem('_USERDATA_', JSON.stringify(userData));
      dispatch({ type: LOGIN, user: userData });

      navigation.popToTop();
    } catch (e) {
      Alert.alert('Maaf', `Error : ${e.message}`);
    }
  };

  if (listDokter.length === 0) {
    return (
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Spinner />
      </Layout>
    );
  }

  return (
    <Formik
      initialValues={{
        kodeDokter: '',
      }}
      onSubmit={handleForm}
    >
      <Layout style={styles.screen}>
        <KeyboardAvoidingView style={styles.screen} behavior='height'>
          <Layout style={styles.container}>
            <Layout style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require('../assets/images/login-image.png')}
              />
            </Layout>
            <Layout style={styles.form}>
              <InputText
                name='kodeDokter'
                label='Kode Dokter'
                placeholder='Masukkan Kode Dokter'
                keyboardType='number-pad'
              />
            </Layout>
            <Layout style={styles.form}>
              <InputButton label='Login' status='success' />
            </Layout>
          </Layout>
        </KeyboardAvoidingView>
      </Layout>
    </Formik>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: width / 2,
    height: width / 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  form: {
    width: width * 0.8,
    marginVertical: 4,
  },
});

export default LoginDokterScreen;
