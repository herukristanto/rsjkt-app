import React, { useContext } from 'react';
import { StyleSheet, Alert, Platform } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import NetInfo from '@react-native-community/netinfo';

import { RegisterContext } from '../../context/RegisterContext';
import { Formik } from 'formik';
import InputText from '../InputText';
import InputButton from '../InputButton';

const RegisterForm4 = (props) => {
  const { setStep, navigation } = props;
  const { state } = useContext(RegisterContext);

  // Register Push Notification (Only when user registering)
  const registerForPushNotificationsAsync = async () => {
    try {
      if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
          );
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          Alert.alert(
            'Error',
            'Failed to get push token for push notification!',
            [{ text: 'OK' }]
          );
          return;
        }
        const token = await Notifications.getExpoPushTokenAsync();
        console.log(token);
        // TODO Send Expo Push Token to server
      } else {
        Alert.alert(
          'Error',
          'Must use physical device for Push Notifications',
          [{ text: 'OK' }]
        );
      }

      if (Platform.OS === 'android') {
        Notifications.createChannelAndroidAsync('default', {
          name: 'default',
          sound: true,
          priority: 'max',
          vibrate: true,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Something Wrong! Please Contact Customer Service!');
    }
  };

  const handleForm = async (values) => {
    try {
      // Check internet connection
      const connect = await NetInfo.fetch();
      if (!connect.isConnected && !connect.isInternetReachable) {
        Alert.alert('Error', 'No Internet Connection', [{ text: 'Retry' }]);
        return;
      }

      // Send Notification Token To Server
      registerForPushNotificationsAsync();

      // TODO Send Data User to Server
      const data = {
        ...state.form,
        ...values,
      };
      // JSON.stringify(data, null, 2)
      Alert.alert('Berhasil', JSON.stringify(data, null, 2), [
        { text: 'OK', onPress: () => navigation.popToTop() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Something Wrong! Please Contact Customer Service!');
    }
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const onValidate = (values) => {
    const errors = {};

    if (!values.pekerjaan) {
      errors.pekerjaan = 'Pekerjaan Wajib Diisi';
    }
    if (!values.namaPekerjaan) {
      errors.namaPekerjaan = 'Nama Pekerjaan Wajib Diisi';
    }
    if (!values.alamatPekerjaan) {
      errors.alamatPekerjaan = 'Alamat Wajib Diisi';
    }
    if (!values.telpPekerjaan) {
      errors.telpPekerjaan = 'Telp Wajib Diisi';
    }
    if (!values.departemen) {
      errors.departemen = 'Dept / Bagian Wajib Diisi';
    }
    if (!values.jabatan) {
      errors.jabatan = 'Jabatan Wajib Diisi';
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{
        ...state.form,
      }}
      onSubmit={handleForm}
      validate={onValidate}
    >
      <React.Fragment>
        <Text category='h4'>Data Pekerjaan</Text>
        <Layout style={styles.form}>
          <InputText
            name='pekerjaan'
            label='Pekerjaan'
            placeholder='Masukkan Pekerjaan'
          />
        </Layout>
        <Layout style={styles.form}>
          <InputText
            name='namaPekerjaan'
            label='Nama Pekerjaan'
            placeholder='Masukkan Nama Pekerjaan'
          />
        </Layout>
        <Layout style={styles.form}>
          <InputText
            name='alamatPekerjaan'
            label='Alamat'
            placeholder='Masukkan Alamat'
            multiline={true}
          />
        </Layout>
        <Layout style={styles.form}>
          <InputText
            name='telpPekerjaan'
            label='Telp'
            placeholder='Masukkan Telp (+628*******)'
            keyboardType='number-pad'
          />
        </Layout>
        <Layout style={styles.form}>
          <InputText
            name='departemen'
            label='Dept / Bagian'
            placeholder='Masukkan Dept / Bagian'
          />
        </Layout>
        <Layout style={styles.form}>
          <InputText
            name='jabatan'
            label='Jabatan'
            placeholder='Masukkan Jabatan'
          />
        </Layout>
        <Layout
          style={[
            styles.form,
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          ]}
        >
          <Button
            onPress={handleBack}
            status='success'
            style={{ width: '40%', marginVertical: 10 }}
          >
            Back
          </Button>
          <InputButton
            label='Simpan'
            status='success'
            style={{ width: '40%', marginVertical: 10 }}
          />
        </Layout>
      </React.Fragment>
    </Formik>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '90%',
    marginVertical: 2,
  },
  label: {
    color: '#778899',
    fontSize: 12,
  },
});

export default RegisterForm4;
