import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Spinner } from '@ui-kitten/components';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { RegisterContext } from '../../context/RegisterContext';
import { ADD_FORM } from '../../reducer/RegisterReducer';
import InputSelect from '../InputSelect';
import InputDateMask from '../InputDateMask';
import InputText from '../InputText';
import InputButton from '../InputButton';
import { validatedate } from '../../utils/helpers';

const RegisterForm1 = ({ setStep }) => {
  const { state, dispatch } = useContext(RegisterContext);

  const handleForm = (values) => {
    dispatch({
      type: ADD_FORM,
      form: {
        ...values,
      },
    });
    setStep((prevStep) => prevStep + 1);
  };

  const formSchema = Yup.object().shape({
    namaLengkap: Yup.string().required('Nama Lengkap Wajib Diisi'),
    namaPanggilan: Yup.string().required('Nama Panggilan Wajib Diisi'),
    identitas: Yup.string().required('Identitas Wajib Diisi'),
    noIndentitas: Yup.string()
      .required('No Identitas Wajib Diisi')
      .length(16, 'No. Identitas Tidak Valid'),
    tanggalLahir: Yup.string()
      .required('Tanggal Lahir Wajib Diisi')
      .test('tanggalLahir', 'Tanggal Lahir Tidak Valid', (value) =>
        !value ? false : validatedate(value),
      ),
    tempatLahir: Yup.string().required('Tempat Lahir Wajib Diisi'),
    kelamin: Yup.string().required('Jenis Kelamin Wajib Diisi'),
    darah: Yup.string().required('Golongan Darah Wajib Diisi'),
    pendidikan: Yup.number().required('Pendidikan Wajib Diisi'),
    agama: Yup.number().required('Agama Wajib Diisi'),
  });

  if (state.isLoading) {
    return <Spinner status="success" />;
  }

  return (
    <Formik
      initialValues={{
        ...state.form,
      }}
      onSubmit={handleForm}
      validationSchema={formSchema}
    >
      <React.Fragment>
        <Text category="h4">Data Pasien</Text>
        <Layout style={styles.form}>
          <InputText
            name="namaLengkap"
            autoCapitalize="words"
            label="Nama Lengkap"
            placeholder="Masukkan Nama Lengkap"
            required
          />
        </Layout>
        <Layout style={styles.form}>
          <InputText
            name="namaPanggilan"
            label="Nama Panggilan"
            placeholder="Masukkan Nama Panggilan"
          />
        </Layout>
        <Layout style={styles.form}>
          <Text style={styles.label}>Identitas</Text>
          <InputSelect
            placeholder="Pilih Identitas"
            items={[
              { label: 'KTP', value: 'ktp' },
              { label: 'SIM', value: 'sim' },
              { label: 'Paspor', value: 'paspor' },
            ]}
            name="identitas"
          />
        </Layout>
        <Layout style={styles.form}>
          <InputText
            name="noIndentitas"
            label="Nomor Identitas"
            placeholder="Masukkan Nomor Identitas"
            keyboardType="number-pad"
          />
        </Layout>
        <Layout style={styles.form}>
          <Text style={styles.label}>Tanggal Lahir</Text>
          <InputDateMask name="tanggalLahir" />
        </Layout>
        <Layout style={styles.form}>
          <InputText
            name="tempatLahir"
            label="Tempat Lahir"
            placeholder="Masukkan Tempat Lahir"
          />
        </Layout>
        <Layout style={styles.form}>
          <Text style={styles.label}>Jenis Kelamin</Text>
          <InputSelect
            placeholder="Pilih Jenis Kelamin"
            items={[
              { label: 'Laki - Laki', value: 'L' },
              { label: 'Perempuan', value: 'P' },
            ]}
            name="kelamin"
          />
        </Layout>
        <Layout style={styles.form}>
          <Text style={styles.label}>Golongan Darah</Text>
          <InputSelect
            placeholder="Pilih Golongan Darah"
            items={[
              { label: 'A', value: 'a' },
              { label: 'B', value: 'b' },
              { label: 'AB', value: 'ab' },
              { label: 'O', value: 'o' },
            ]}
            name="darah"
          />
        </Layout>
        <Layout style={styles.form}>
          <Text style={styles.label}>Pendidikan</Text>
          <InputSelect
            placeholder="Masukkan Pendidikan"
            items={state.listPendidikan}
            name="pendidikan"
          />
        </Layout>
        <Layout style={styles.form}>
          <Text style={styles.label}>Agama</Text>
          <InputSelect
            placeholder="Pilih Agama"
            items={state.listAgama}
            name="agama"
          />
        </Layout>
        <Layout style={[styles.form, { alignItems: 'center' }]}>
          <InputButton
            label="Next"
            status="success"
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
