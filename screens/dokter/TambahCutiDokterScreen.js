import React, { useContext, useEffect, useState } from 'react';
import { Layout, Spinner, Button } from '@ui-kitten/components';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { Formik } from 'formik';

import Header from '../../components/Header';
import { AppContext } from '../../context/AppContext';
import { baseAxios } from '../../utils/useAxios';
import InputText from '../../components/InputText';
import InputMultipleDate from '../../components/TambahCutiDokterScreenComponent/InputMultipleDate';
import InputButton from '../../components/InputButton';

const { width } = Dimensions.get('screen');

const TambahCutiDokterScreen = () => {
  const { state } = useContext(AppContext);
  const [no, setNo] = useState();
  const [minDate, setMinDate] = useState();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const getData = async () => {
      try {
        // Check internet connection
        const connect = await NetInfo.fetch();
        if (!connect.isConnected && !connect.isInternetReachable) {
          Alert.alert('Error', 'No Internet Connection', [{ text: 'Retry' }]);
          return;
        }

        const { data } = await baseAxios.get('nocutidr', {
          params: {
            key: 'rsjkt4231',
            dokter_id: state.user.idDokter,
          },
        });

        const startDate = data.tgl_pengajuan.split('-').reverse().join('-');

        setNo(data.kd_cuti);
        setMinDate(startDate);
      } catch (error) {
        Alert.alert(
          'Error',
          'Something Wrong! Please Contact Customer Service!',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      }
      setLoading(false);
    };
    getData();
  }, []);

  const handleForm = async (values) => {
    try {
      const request = {
        key: 'rsjkt4231',
        dokter_id: state.user.idDokter,
        dokter_nm: state.user.namaDokter,
        kd_cuti: values.no,
        status: '1',
        tanggal: [...values.tanggals],
      };

      const { data } = await baseAxios.post('cutidr', request);

      Alert.alert('Berhasil', 'Data Berhasil Disimpan', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      if (error.response.status === 501) {
        Alert.alert('Peringatan', error.response.data.message);
      } else {
        Alert.alert(
          'Error',
          'Something Wrong! Please Contact Customer Service!'
        );
      }
    }
  };

  const onValidate = (values) => {
    const errors = {};

    if (values.alasan === '') {
      errors.alasan = 'Alasan Wajib Diisi';
    }

    if (values.tanggals.length === 0) {
      errors.tanggal = 'Tanggal Wajib Diisi';
    }

    return errors;
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

  return (
    <Layout style={styles.screen}>
      <Header />

      <Formik
        initialValues={{
          no: no,
          alasan: '',
          tanggal: {},
          tanggals: [],
        }}
        onSubmit={handleForm}
        validate={onValidate}
      >
        <Layout style={styles.container}>
          <Layout style={styles.form}>
            <InputText name='no' label='No' disabled />
          </Layout>
          <Layout style={styles.form}>
            <InputText
              name='alasan'
              label='Alasan'
              placeholder='Masukkan Alasan'
            />
          </Layout>
          <Layout style={styles.form}>
            <InputMultipleDate name='tanggal' minDate={minDate} />
          </Layout>
          <Layout style={styles.buttonContainer}>
            <Button status='success' onPress={() => navigation.goBack()}>
              Back
            </Button>
            <InputButton label='Ajukan' status='success' />
          </Layout>
        </Layout>
      </Formik>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    marginTop: 20,
    width: width,
    alignItems: 'center',
  },
  form: {
    width: '90%',
    marginVertical: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width,
    marginTop: 30,
  },
});

export default TambahCutiDokterScreen;
