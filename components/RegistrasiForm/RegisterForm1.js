import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { Formik } from 'formik';

import { RegisterContext } from '../../context/RegisterContext';
import { ADD_FORM } from '../../reducer/RegisterReducer';
import InputSelect from '../InputSelect';
import InputDateMask from '../InputDateMask';
import InputText from '../InputText';
import InputRadio from '../InputRadio';
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

  return (
    <Formik
      initialValues={{
        ...state.form,
      }}
      onSubmit={handleForm}
    >
      <React.Fragment>
        <Text category='h4'>Data Pasien</Text>
        <Layout style={styles.form}>
          <InputText
            name='namaLengkap'
            autoCapitalize='words'
            label='Nama Lengkap'
            placeholder='Masukkan Nama Lengkap'
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
          <Text style={styles.label}>Jenis Kelamin</Text>
          <InputRadio name='kelamin' items={['Laki - Laki', 'Perempuan']} />
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
          <InputText
            name='pendidikan'
            label='Pendidikan'
            placeholder='Masukkan Pendidikan'
          />
        </Layout>
        <Layout style={styles.form}>
          <Text style={styles.label}>Agama</Text>
          <InputSelect
            placeholder='Pilih Agama'
            items={[
              { label: 'Islam', value: 'islam' },
              { label: 'Kristen', value: 'kristen' },
              { label: 'Katolik', value: 'katolik' },
              { label: 'Hindu', value: 'hindu' },
              { label: 'Budha', value: 'budha' },
              { label: 'Khong Hu Cu', value: 'khong_hu_cu' },
            ]}
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
