import React, { useState, useContext } from 'react';
import { Layout, Text, Icon } from '@ui-kitten/components';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  Alert,
  AsyncStorage,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Formik } from 'formik';

import InputText from '../../components/InputText';
import InputButton from '../../components/InputButton';
import { AppContext } from '../../context/AppContext';
import { baseAxios } from '../../utils/useAxios';
import LoadingOverlay from '../../components/LoadingOverlay';
import { LOGOUT } from '../../reducer/AppReducer';

const { width } = Dimensions.get('screen');

const ResetPasswordDokterScreen = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    Keyboard.dismiss();
    await AsyncStorage.removeItem('_USERDATA_');
    dispatch({ type: LOGOUT });
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeNavigation' }],
    });
    // navigation.navigate('HomeNavigation', {
    //   screen: 'Dashboard',
    //   params: {
    //     screen: 'Login',
    //   },
    // });
  };

  const onSubmit = async (value, bag) => {
    try {
      setLoading(true);
      const { data } = await baseAxios.get('/dokter', {
        params: {
          dok_login: `D${state.user.idDokter}`,
        },
      });

      if (data.Password !== value.password) {
        Alert.alert('Peringatan', 'Password Lama Salah');
        setLoading(false);
        return;
      }
      if (value.newPassword !== value.verifyPassword) {
        Alert.alert(
          'Peringatan',
          'Password Baru dan Verfikasi Password Tidak Sama'
        );
        setLoading(false);
        return;
      }
      const request = {
        dokter_id: state.user.idDokter,
        password: value.password,
        newpassword: value.newPassword,
      };
      const { data: dataPassword } = await baseAxios.put('/Dpassword', request);
      setLoading(false);
      bag.resetForm();
      Alert.alert('Berhasil', 'Password Berhasil Diganti', [
        {
          text: 'OKE',
          onPress: () => handleLogout(),
        },
      ]);
    } catch (error) {
      Alert.alert(
        'Error',
        'Something Wrong! Please Contact Customer Service!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
      return;
    }
  };

  const onValidate = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = 'Password Lama Wajib Diisi';
    }
    if (!values.newPassword) {
      errors.newPassword = 'Password Baru Wajib Diisi';
    }
    if (!values.verifyPassword) {
      errors.verifyPassword = 'Verifikasi Password Wajib Diisi';
    }
    return errors;
  };

  return (
    <Layout style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon style={{ width: 32, height: 32 }} fill='white' name='menu' />
          </TouchableOpacity>
        </View>
        <View style={styles.title}>
          <Image
            source={require('../../assets/images/login-image.png')}
            style={{ width: width * 0.09, height: width * 0.09 }}
          />
          <Text
            category='h6'
            numberOfLines={2}
            style={{ textAlign: 'center', marginLeft: 8, color: 'white' }}
          >
            RS Jakarta Mobile
          </Text>
        </View>
      </View>

      <Layout style={styles.formContainer}>
        <Formik
          initialValues={{
            password: '',
            newPassword: '',
            verifyPassword: '',
          }}
          onSubmit={onSubmit}
          validate={onValidate}
        >
          <React.Fragment>
            <Layout style={styles.form}>
              <InputText
                name='password'
                label='Password Lama'
                placeholder='Masukkan Password Lama'
                secureTextEntry
              />
            </Layout>
            <Layout style={styles.form}>
              <InputText
                name='newPassword'
                label='Password Baru'
                placeholder='Masukkan Password Baru'
                secureTextEntry
              />
            </Layout>
            <Layout style={styles.form}>
              <InputText
                name='verifyPassword'
                label='Verifikasi Password'
                placeholder='Masukkan Verifikasi Password'
                secureTextEntry
              />
            </Layout>
            <InputButton label='Submit' status='success' />
          </React.Fragment>
        </Formik>
        {loading && <LoadingOverlay />}
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
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  form: {
    width: width * 0.8,
    marginVertical: 4,
  },
  header: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgb(7,94,85)',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: width * 0.15,
  },
});

export default ResetPasswordDokterScreen;
