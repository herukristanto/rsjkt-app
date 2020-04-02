import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage
} from 'react-native';
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';

import useAxios from '../utils/useAxios';
import CustomDatePicker from '../components/CustomDatePicker';
import moment from 'moment';
import { AppContext } from '../context/AppContext';
import { LOGIN } from '../reducer/AppReducer';

const { width } = Dimensions.get('screen');

const LoginScreen = () => {
  const navigation = useNavigation();
  const { dispatch } = useContext(AppContext);

  const [, postLogin] = useAxios(
    { url: '/pasien', method: 'GET' },
    { manual: true }
  );

  // const [password, setPassword] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState(new Date());

  const { values, setFieldValue, submitForm } = useFormik({
    initialValues: {
      rm: ''
    },
    onSubmit: async (values, { setErrors }) => {
      setErrors({});

      try {
        const { data } = await postLogin({ params: values });
        const tgl = moment(data.Tgl_lahir).format('YYYY-MM-DD');

        if (data === '') {
          Alert.alert('Maaf', 'No Rekam Medis Tidak Ditemukan');
          return;
        }
        if (!moment(tgl).isSame(moment(tanggalLahir).format('YYYY-MM-DD'))) {
          Alert.alert('Maaf', 'Tanggal Lahir Anda Salah');
          return;
        }

        const userData = {
          nomor_cm: data.nomor_cm,
          namaPasien: data.namaPasien
        };
        await AsyncStorage.setItem('_USERDATA_', JSON.stringify(userData));
        dispatch({ type: LOGIN, user: userData });

        console.log(data);

        navigation.navigate('RegistrasiPoliklinik');
      } catch (e) {
        Alert.alert('Maaf', `Error : ${e.message}`);
      }
    }
  });

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior='padding'
      keyboardVerticalOffset={80}
    >
      <Layout style={styles.container}>
        <Layout style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/images/login-image.png')}
          />
        </Layout>
        <Layout style={styles.form}>
          <Input
            label='No Rekam Medis'
            placeholder='Masukkan No Rekam Medis'
            value={values.noRekamMedis}
            onChangeText={text => setFieldValue('rm', text)}
            keyboardType='number-pad'
          />
        </Layout>
        <Layout style={styles.form}>
          <Text style={styles.label}>Tanggal Lahir</Text>
          <CustomDatePicker value={tanggalLahir} setValue={setTanggalLahir} />
          {/* <Input
            secureTextEntry
            textContentType='password'
            label='Password'
            placeholder='Masukkan Password'
            value={password}
            onChangeText={text => setPassword(text)}
          /> */}
        </Layout>
        <Layout style={styles.form}>
          <Button onPress={submitForm} status='success'>
            Login
          </Button>
        </Layout>
        <Layout style={[styles.form, { alignItems: 'center' }]}>
          <Text
            style={{ textDecorationLine: 'underline' }}
            onPress={() => navigation.navigate('Register')}
          >
            Belum Terdaftar?
          </Text>
        </Layout>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: width / 2,
    height: width / 2
  },
  image: {
    width: '100%',
    height: '100%'
  },
  form: {
    width: width * 0.8,
    marginVertical: 4
  },
  label: {
    color: '#778899',
    fontSize: 12
  }
});

export default LoginScreen;
