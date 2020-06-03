import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';

import { RegisterContext } from '../../context/RegisterContext';
import { ADD_FORM } from '../../reducer/RegisterReducer';
import { Formik } from 'formik';
import InputText from '../InputText';
import InputButton from '../InputButton';
import InputSelect from '../InputSelect';

const RegisterForm3 = (props) => {
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

    if (!values.kawin) {
      errors.kawin = 'Status Perkawinan Wajib Diisi';
    }
    // if (!values.namaAyah) {
    //   errors.namaAyah = 'Nama Ayah Wajib Diisi';
    // }
    // if (!values.pekerjaanAyah) {
    //   errors.pekerjaanAyah = 'Pekerjaan Ayah Wajib Diisi';
    // }
    // if (!values.namaIbu) {
    //   errors.namaIbu = 'Nama Ibu Wajib Diisi';
    // }
    // if (!values.namaSutri) {
    //   errors.namaSutri = 'Nama Suami/Istri Wajib Diisi';
    // }
    // if (!values.pekerjaanSutri) {
    //   errors.pekerjaanSutri = 'Pekerjaan Suami/Istri Wajib Diisi';
    // }

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
        <Text category='h4'>Keluarga</Text>
        <Layout style={styles.form}>
          <Text style={styles.label}>Status Perkawinan</Text>
          <InputSelect
            placeholder='Pilih Status Perkawinan'
            items={[
              { label: 'Kawin', value: 'kawin' },
              { label: 'Belum Kawin', value: 'belum kawin' },
              { label: 'Janda/Duda', value: 'janda/duda' },
              { label: 'Dibawah Umur', value: 'dibawah umur' },
            ]}
            name='kawin'
          />
        </Layout>
        <Layout style={styles.form}>
          <InputText
            name='namaAyah'
            label='Nama Ayah'
            placeholder='Masukkan Nama Ayah'
          />
        </Layout>
        <Layout style={styles.form}>
          <Text style={styles.label}>Pekerjaan Ayah</Text>
          <InputSelect
            placeholder='Pilih Pekerjaan Ayah'
            items={state.listPekerjaan}
            name='pekerjaanAyah'
          />
        </Layout>
        <Layout style={styles.form}>
          <InputText
            name='namaIbu'
            label='Nama Ibu'
            placeholder='Masukkan Nama Ibu'
          />
        </Layout>
        <Layout style={styles.form}>
          <InputText
            name='namaSutri'
            label='Nama Suami/Istri'
            placeholder='Masukkan Nama Suami/Istri'
          />
        </Layout>
        <Layout style={styles.form}>
          <Text style={styles.label}>Pekerjaan Suami/Istri</Text>
          <InputSelect
            placeholder='Pilih Pekerjaan Suami/Istri'
            items={state.listPekerjaan}
            name='pekerjaanSutri'
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

export default RegisterForm3;
