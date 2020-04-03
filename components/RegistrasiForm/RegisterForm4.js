import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import { RegisterContext } from '../../context/RegisterContext';
import { ADD_FORM, RESET_FORM } from '../../reducer/RegisterReducer';
import { Formik } from 'formik';
import InputText from '../InputText';
import InputButton from '../InputButton';

const RegisterForm4 = props => {
  const { setStep, navigation } = props;
  const { state, dispatch } = useContext(RegisterContext);
  const [isSave, setIsSave] = useState(false);

  const handleForm = values => {
    dispatch({
      type: ADD_FORM,
      form: {
        ...values
      }
    });
    setIsSave(true);
  };

  useEffect(() => {
    if (isSave) {
      // Send To Server

      // JSON.stringify(data, null, 2)
      Alert.alert('Berhasil', JSON.stringify(state.form, null, 2), [
        { text: 'OK', onPress: () => navigation.popToTop() }
      ]);
      dispatch({
        type: RESET_FORM
      });
      setIsSave(false);
      setStep(1);
    }
    return () => {};
  }, [isSave]);

  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  return (
    <Formik
      initialValues={{
        ...state.form
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
              justifyContent: 'space-between'
            }
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
    marginVertical: 2
  },
  label: {
    color: '#778899',
    fontSize: 12
  }
});

export default RegisterForm4;
