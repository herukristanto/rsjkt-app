import React, { useContext } from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage,
} from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';

import useAxios from '../utils/useAxios';
import InputText from '../components/InputText';
import InputButton from '../components/InputButton';
import moment from 'moment';
import { AppContext } from '../context/AppContext';
import { LOGIN } from '../reducer/AppReducer';
import InputDateMask from '../components/InputDateMask';

const { width } = Dimensions.get('screen');

const LoginScreen = () => {
  const navigation = useNavigation();
  const { dispatch } = useContext(AppContext);

  const [, postLogin] = useAxios(
    { url: '/pasien', method: 'GET' },
    { manual: true }
  );

  const handleForm = async (values) => {
    try {
      const params = {
        rm: values.noRekamMedis,
      };
      const { data } = await postLogin({ params: params });
      const tgl = moment(data.Tgl_lahir).format('DD/MM/YYYY');

      if (data === '') {
        Alert.alert('Maaf', 'No Rekam Medis Tidak Ditemukan');
        return;
      }
      if (tgl != values.tanggalLahir) {
        Alert.alert('Maaf', 'Tanggal Lahir Anda Salah');
        return;
      }

      const userData = {
        nomor_cm: data.nomor_cm,
        namaPasien: data.namaPasien,
        Tgl_lahir: data.Tgl_lahir,
        nm_jaminan: data.nm_jaminan,
        role: 'pasien',
      };
      await AsyncStorage.setItem('_USERDATA_', JSON.stringify(userData));
      dispatch({ type: LOGIN, user: userData });

      navigation.popToTop();
    } catch (e) {
      Alert.alert('Maaf', `Error : ${e.message}`);
    }
  };

  return (
    <Formik
      initialValues={{
        noRekamMedis: '',
        tanggalLahir: '',
      }}
      onSubmit={handleForm}
    >
      <Layout style={styles.screen}>
        <KeyboardAvoidingView
          style={styles.screen}
          behavior='height'
          keyboardVerticalOffset={120}
        >
          <Layout style={styles.container}>
            <Layout style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require('../assets/images/login-image.png')}
              />
            </Layout>
            <Layout style={styles.form}>
              <InputText
                name='noRekamMedis'
                label='No Rekam Medis'
                placeholder='Masukkan No Rekam Medis'
                keyboardType='number-pad'
              />
            </Layout>
            <Layout style={styles.form}>
              <Text style={styles.label}>Tanggal Lahir</Text>
              <InputDateMask name='tanggalLahir' />
            </Layout>
            <Layout style={styles.form}>
              <InputButton label='Login' status='success' />
            </Layout>
            <Layout
              style={[
                styles.form,
                { alignItems: 'center', marginVertical: 10 },
              ]}
            >
              <Text
                style={{ textDecorationLine: 'underline', fontSize: 16 }}
                onPress={() => navigation.navigate('Register')}
              >
                Belum Terdaftar?
              </Text>
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
  label: {
    color: '#778899',
    fontSize: 12,
  },
});

export default LoginScreen;
