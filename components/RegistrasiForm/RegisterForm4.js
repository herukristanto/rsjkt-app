import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Alert, Platform } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';

import { RegisterContext } from '../../context/RegisterContext';
import { ADD_FORM, RESET_FORM } from '../../reducer/RegisterReducer';
import { Formik } from 'formik';
import InputText from '../InputText';
import InputButton from '../InputButton';

const RegisterForm4 = (props) => {
  const { setStep, navigation } = props;
  const { state, dispatch } = useContext(RegisterContext);
  const [isSave, setIsSave] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');

  // Register Push Notification (Only when user registering)
  const registerForPushNotificationsAsync = async () => {
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
      setExpoPushToken(token);
      setIsSave(true);
    } else {
      Alert.alert('Error', 'Must use physical device for Push Notifications', [
        { text: 'OK' },
      ]);
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  const handleForm = (values) => {
    dispatch({
      type: ADD_FORM,
      form: {
        ...values,
      },
    });

    // Send Notification Token To Server
    registerForPushNotificationsAsync();
  };

  useEffect(() => {
    if (isSave) {
      // Send To Server

      // JSON.stringify(data, null, 2)
      Alert.alert(
        'Berhasil',
        JSON.stringify({ token: expoPushToken, ...state.form }, null, 2),
        [{ text: 'OK', onPress: () => navigation.popToTop() }]
      );
      dispatch({
        type: RESET_FORM,
      });
      setIsSave(false);
      setStep(1);
    }
    return () => {};
  }, [isSave]);

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <Formik
      initialValues={{
        ...state.form,
      }}
      onSubmit={handleForm}
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
            placeholder='Masukkan Telp'
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
