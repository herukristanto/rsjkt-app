import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage,
  BackHandler,
} from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import NetInfo from '@react-native-community/netinfo';
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Yup from 'yup';

import { baseAxios } from '../utils/useAxios';
import InputText from '../components/InputText';
import InputButton from '../components/InputButton';
import moment from 'moment';
import { AppContext } from '../context/AppContext';
import { LOGIN } from '../reducer/AppReducer';
import InputDateMask from '../components/InputDateMask';
import ModalDokter from '../components/LoginScreenComponent/ModalDokter';
import LoadingOverlay from '../components/LoadingOverlay';
import { validatedate } from '../utils/helpers';

const { width } = Dimensions.get('screen');

const LoginScreen = () => {
  const navigation = useNavigation();
  const { dispatch } = useContext(AppContext);
  const [dataDokter, setDataDokter] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const states = navigation.dangerouslyGetState().routes;

  useEffect(() => {
    const handleBackPress = () => {
      const routes = states.find((route) => route.name === 'Home');
      if (!routes) {
        BackHandler.exitApp();
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleForm = async (values) => {
    try {
      // Check internet connection
      const connect = await NetInfo.fetch();
      if (!connect.isConnected && !connect.isInternetReachable) {
        Alert.alert('Error', 'No Internet Connection', [{ text: 'Retry' }]);
        return;
      }

      setLoading(true);

      // Check apakah values.noRekamMedis ada di kode dokter
      try {
        const { data: dataDokter } = await baseAxios.get('/dokter', {
          params: {
            dok_login: values.noRekamMedis,
          },
        });
        // Dokter Login
        const { data } = await baseAxios.get('/daftar_praktek', {
          params: {
            key: 'rsjkt4231',
          },
        });
        const dokterLogin = data.find(
          (dokter) => dokter.Dokter_ID === dataDokter.PERSONILID,
        );
        const dataLoginDokter = {
          ...dataDokter,
          poli: dokterLogin.Poli_nm.trim(),
          idPoli: dokterLogin.Poli_ID,
        };
        setLoading(false);
        setDataDokter(dataLoginDokter);
        setShowModal(true);
      } catch (error) {
        try {
          // Pasien Login
          const { data } = await baseAxios.get('/pasien', {
            params: {
              rm: values.noRekamMedis,
            },
          });
          const tgl = moment(data.Tgl_lahir).format('DD/MM/YYYY');

          if (data === '') {
            setLoading(false);
            Alert.alert('Maaf', 'No Rekam Medis Tidak Ditemukan');
            return;
          }
          if (tgl != values.tanggalLahir) {
            setLoading(false);
            Alert.alert('Maaf', 'Tanggal Lahir Anda Salah');
            return;
          }

          // * Send Expo Push Token
          if (Constants.isDevice) {
            const token = await Notifications.getExpoPushTokenAsync();

            if (Platform.OS === 'android') {
              Notifications.createChannelAndroidAsync('default', {
                name: 'default',
                sound: true,
                priority: 'max',
                vibrate: true,
              });
            }

            await baseAxios.put('/pasien', {
              rm: values.noRekamMedis,
              token_phone: token,
            });

            const userData = {
              nomor_cm: data.nomor_cm,
              namaPasien: data.namaPasien,
              Tgl_lahir: data.Tgl_lahir,
              kd_jaminan: data.kd_jaminan ? data.kd_jaminan : '',
              kd_anakjmn: data.kd_anakjmn ? data.kd_anakjmn : '',
              no_kartu: data.no_kartu ? data.no_kartu : '',
              Hand_phone: data.Hand_phone,
              role: 'pasien',
            };

            await AsyncStorage.setItem('_USERDATA_', JSON.stringify(userData));
            dispatch({ type: LOGIN, user: userData });

            navigation.reset({
              index: 0,
              routes: [{ name: 'HomeNavigation' }],
            });
          } else {
            setLoading(false);
            Alert.alert(
              'Error',
              'Must use physical device for Push Notifications',
            );
            return;
          }
        } catch (err) {
          Alert.alert(
            'Maaf',
            'Something Wrong! Please Contact Customer Service!',
          );
          setLoading(false);
        }
      }
    } catch (e) {
      Alert.alert('Maaf', 'Something Wrong! Please Contact Customer Service!');
      setLoading(false);
    }
  };

  const formSchema = Yup.object().shape({
    noRekamMedis: Yup.string().required('No Rekam Tidak Boleh Kosong'),
    tanggalLahir: Yup.string().test(
      'tanggalLahir',
      'Tanggal Lahir Tidak Valid',
      (value) => (!value ? true : validatedate(value)),
    ),
  });

  return (
    <Formik
      initialValues={{
        noRekamMedis: '',
        tanggalLahir: '',
      }}
      onSubmit={handleForm}
      validationSchema={formSchema}
    >
      <Layout style={styles.screen}>
        <ModalDokter
          showModal={showModal}
          dataDokter={dataDokter}
          setShowModal={setShowModal}
          dispatch={dispatch}
        />
        <KeyboardAvoidingView
          style={styles.screen}
          behavior="height"
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
                name="noRekamMedis"
                label="No Rekam Medis"
                placeholder="Masukkan No Rekam Medis"
              />
            </Layout>
            <Layout style={styles.form}>
              <Text style={styles.label}>Tanggal Lahir</Text>
              <InputDateMask name="tanggalLahir" />
            </Layout>
            <Layout style={styles.form}>
              <InputButton label="Login" status="success" />
            </Layout>
            <Layout
              style={[
                styles.form,
                {
                  alignItems: 'center',
                  marginVertical: 5,
                },
              ]}
            >
              <Text
                style={{
                  textDecorationLine: 'underline',
                  fontSize: 16,
                  padding: 4,
                }}
                onPress={() => navigation.navigate('Register')}
              >
                Belum Terdaftar?
              </Text>
            </Layout>
          </Layout>
        </KeyboardAvoidingView>
        {loading && <LoadingOverlay />}
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
