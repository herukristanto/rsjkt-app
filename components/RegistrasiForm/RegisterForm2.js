import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import { RegisterContext } from '../../context/RegisterContext';
import { ADD_FORM } from '../../reducer/RegisterReducer';
import { Formik } from 'formik';
import InputText from '../InputText';
import InputButton from '../InputButton';

const RegisterForm2 = (props) => {
  const { setStep } = props;
  const { state, dispatch } = useContext(RegisterContext);

  const handleForm = async (values) => {
    dispatch({
      type: ADD_FORM,
      form: {
        ...values,
      },
    });
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const onValidate = (values) => {
    const errors = {};

    if (!values.alamat) {
      errors.alamat = 'Alamat Wajib Diisi';
    }
    if (!values.rt) {
      errors.rt = 'RT Wajib Diisi';
    }
    if (!values.rw) {
      errors.rw = 'RW Wajib Diisi';
    }
    if (!values.kota) {
      errors.kota = 'Kota Wajib Diisi';
    }
    if (!values.kodePos) {
      errors.kodePos = 'Kode Pos Wajib Diisi';
    }
    if (!values.telp) {
      errors.telp = 'No Telp Wajib Diisi';
    }
    if (!values.telp2) {
      errors.telp2 = 'No Telp 2 Wajib Diisi';
    }
    if (!values.email) {
      errors.email = 'Email Wajib Diisi';
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
        <Text category='h4'>Alamat</Text>
        <Layout style={styles.form}>
          <InputText
            name='alamat'
            label='Alamat'
            placeholder='Masukkan Alamat'
            multiline={true}
          />
        </Layout>
        <Layout
          style={[
            styles.form,
            { flexDirection: 'row', justifyContent: 'space-between' },
          ]}
        >
          <InputText
            name='rt'
            label='RT'
            placeholder='Masukkan RT'
            keyboardType='number-pad'
            style={{ width: '48%' }}
          />
          <InputText
            name='rw'
            label='RW'
            placeholder='Masukkan RW'
            keyboardType='number-pad'
            style={{ width: '48%' }}
          />
        </Layout>
        <Layout style={styles.form}>
          <InputText name='kota' label='Kota' placeholder='Masukkan Kota' />
        </Layout>
        <Layout style={styles.form}>
          <InputText
            name='kodePos'
            label='Kode Pos'
            placeholder='Masukkan Kode Pos'
            keyboardType='number-pad'
          />
        </Layout>
        <Layout style={styles.form}>
          <InputText
            name='telp'
            label='Telp'
            placeholder='Masukkan Telp (+628*******)'
            keyboardType='number-pad'
          />
        </Layout>
        <Layout style={styles.form}>
          <InputText
            name='telp2'
            label='Telp 2'
            placeholder='Masukkan Telp 2 (+628*******)'
            keyboardType='number-pad'
          />
        </Layout>
        <Layout style={styles.form}>
          <InputText
            name='email'
            label='Email'
            placeholder='Masukkan Email'
            keyboardType='email-address'
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
            label='Next'
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

export default RegisterForm2;
