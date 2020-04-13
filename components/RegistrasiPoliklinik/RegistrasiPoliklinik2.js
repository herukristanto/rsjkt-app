import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Layout, Button } from '@ui-kitten/components';
import { PoliklinikContext } from '../../context/PoliklinikContext';
import { ADD_TO_FORM } from '../../reducer/PoliklinikReducer';
import { Formik } from 'formik';
import InputText from '../InputText';
import InputButton from '../InputButton';

const RegistrasiPoliklinik2 = ({ setStep }) => {
  const { state, dispatch } = useContext(PoliklinikContext);

  const handleForm = (values) => {
    dispatch({
      type: ADD_TO_FORM,
      data: {
        ...values,
      },
    });
    setStep((prevStep) => prevStep + 1);
  };

  const RenderPribadi = () => {
    return (
      <Layout style={styles.form}>
        <Text>Jaminan : Pribadi</Text>
      </Layout>
    );
  };

  const RenderPenjamin = () => {
    return (
      <React.Fragment>
        <Layout style={styles.form}>
          <Text>Jaminan : {state.form.jaminan}</Text>
        </Layout>
        <Layout style={styles.form}>
          <Text>Perusahaan : {state.form.perusahaan}</Text>
        </Layout>
        <Layout style={styles.form}>
          <Text>No Jaminan : {state.form.noKartu}</Text>
        </Layout>
      </React.Fragment>
    );
  };

  return (
    <Formik
      initialValues={{
        telp: '',
      }}
      onSubmit={handleForm}
    >
      <React.Fragment>
        <Text>Registrasi Poliklinik</Text>
        <Layout style={styles.form}>
          <Text>No Rekam Medis : {state.form.noRekamMedis}</Text>
        </Layout>
        <Layout style={styles.form}>
          <Text>Tanggal Lahir : {state.form.tanggalLahir}</Text>
        </Layout>
        <Layout style={styles.form}>
          <Text>Dokter : {state.form.dokter}</Text>
        </Layout>
        <Layout style={styles.form}>
          <Text>Poliklinik : {state.form.poliklinik}</Text>
        </Layout>
        {state.form.status === 0 ? <RenderPribadi /> : <RenderPenjamin />}
        <Layout style={styles.form}>
          <InputText
            name='telp'
            label='Masukkan Telp'
            keyboardType='number-pad'
          />
        </Layout>
        <Layout
          style={[
            styles.form,
            { flexDirection: 'row', justifyContent: 'space-between' },
          ]}
        >
          <Button
            status='success'
            onPress={() => setStep((prevStep) => prevStep - 1)}
            style={{ width: '45%' }}
          >
            Back
          </Button>
          <InputButton label='Next' status='success' style={{ width: '45%' }} />
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

export default RegistrasiPoliklinik2;
