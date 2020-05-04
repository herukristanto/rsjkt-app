import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Spinner } from '@ui-kitten/components';
import { Formik } from 'formik';

import { RegisterContext } from '../../context/RegisterContext';
import { ADD_FORM } from '../../reducer/RegisterReducer';
import InputSelect from '../InputSelect';
import InputDateMask from '../InputDateMask';
import InputText from '../InputText';
import InputButton from '../InputButton';

const RegisterForm1 = (props) => {
  const { state, dispatch } = useContext(RegisterContext);
  const { setStep } = props;

  const handleForm = async (values) => {
    await dispatch({
      type: ADD_FORM,
      form: {
        ...values,
      },
    });
    setStep((prevStep) => prevStep + 1);
  };

  const onValidate = (values) => {
    const errors = {};

    if (!values.namaLengkap) {
      errors.namaLengkap = 'Nama Lengkap Wajib Diisi';
    }
    if (!values.namaPanggilan) {
      errors.namaPanggilan = 'Nama Panggilan Wajib Diisi';
    }
    if (!values.identitas) {
      errors.identitas = 'Identitas Wajib Diisi';
    }
    if (!values.noIndentitas) {
      errors.noIndentitas = 'No Identitas Wajib Diisi';
    }
    if (!values.tanggalLahir) {
      errors.tanggalLahir = 'Tanggal Lahir Wajib Diisi';
    }
    if (!values.tempatLahir) {
      errors.tempatLahir = 'Tempat Lahir Wajib Diisi';
    }
    if (!values.kelamin) {
      errors.kelamin = 'Jenis Kelamin Wajib Diisi';
    }
    if (!values.darah) {
      errors.darah = 'Golongan Darah Wajib Diisi';
    }
    if (!values.pendidikan) {
      errors.pendidikan = 'Pendidikan Wajib Diisi';
    }
    if (!values.agama) {
      errors.agama = 'Agama Wajib Diisi';
    }

    return errors;
  };

  if (state.isLoading) {
    return <Spinner status='success' />;
  }

  return (
    <Formik
      initialValues={{
        ...state.form,
      }}
      onSubmit={handleForm}
      validate={onValidate}
    >
      <React.Fragment>
        <Text category='h4'>Data Pasien</Text>
        <Layout style={styles.form}>
          <InputText
            name='namaLengkap'
            autoCapitalize='words'
            label='Nama Lengkap'
            placeholder='Masukkan Nama Lengkap'
            required
          />
        </Layout>
        <Layout style={styles.form}>
          <InputText
            name='namaPanggilan'
            label='Nama Panggilan'
            placeholder='Masukkan Nama Panggilan'
          />
        </Layout>
        <Layout style={styles.form}>
          <Text style={styles.label}>Identitas</Text>
          <InputSelect
            placeholder='Pilih Identitas'
            items={[
              { label: 'KTP', value: 'ktp' },
              { label: 'SIM', value: 'sim' },
              { label: 'Paspor', value: 'paspor' },
            ]}
            name='identitas'
          />
        </Layout>
        <Layout style={styles.form}>
          <InputText
            name='noIndentitas'
            label='Nomor Identitas'
            placeholder='Masukkan Nomor Identitas'
            keyboardType='number-pad'
          />
        </Layout>
        <Layout style={styles.form}>
          <Text style={styles.label}>Tanggal Lahir</Text>
          <InputDateMask name='tanggalLahir' />
        </Layout>
        <Layout style={styles.form}>
          <InputText
            name='tempatLahir'
            label='Tempat Lahir'
            placeholder='Masukkan Tempat Lahir'
          />
        </Layout>
        <Layout style={styles.form}>
          <Text style={styles.label}>Jenis Kelamin</Text>
          <InputSelect
            placeholder='Pilih Jenis Kelamin'
            items={[
              { label: 'Laki - Laki', value: 'L' },
              { label: 'Perempuan', value: 'P' },
            ]}
            name='kelamin'
          />
        </Layout>
        <Layout style={styles.form}>
          <Text style={styles.label}>Golongan Darah</Text>
          <InputSelect
            placeholder='Pilih Golongan Darah'
            items={[
              { label: 'A', value: 'a' },
              { label: 'B', value: 'b' },
              { label: 'AB', value: 'ab' },
              { label: 'O', value: 'o' },
            ]}
            name='darah'
          />
        </Layout>
        <Layout style={styles.form}>
          <Text style={styles.label}>Pendidikan</Text>
          <InputSelect
            placeholder='Masukkan Pendidikan'
            items={state.listPendidikan}
            name='pendidikan'
          />
        </Layout>
        <Layout style={styles.form}>
          <Text style={styles.label}>Agama</Text>
          <InputSelect
            placeholder='Pilih Agama'
            items={state.listAgama}
            name='agama'
          />
        </Layout>
        <Layout style={[styles.form, { alignItems: 'center' }]}>
          <InputButton
            label='Next'
            status='success'
            style={{ width: '50%', marginVertical: 10 }}
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

export default RegisterForm1;
