import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Layout, Button, Input } from '@ui-kitten/components';

const RegistrasiPoliklinik2 = props => {
  const { setForm, setStep, form } = props;

  const [telp, setTelp] = useState(form.telp);

  const handleForm = () => {
    setForm(prevForm => {
      return {
        ...prevForm,
        telp
      };
    });
    setStep(prevStep => prevStep + 1);
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
          <Text>Jaminan : {form.jaminan}</Text>
        </Layout>
        <Layout style={styles.form}>
          <Text>Perusahaan : {form.perusahaan}</Text>
        </Layout>
        <Layout style={styles.form}>
          <Text>No Jaminan : {form.noKartu}</Text>
        </Layout>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Text>Registrasi Poliklinik</Text>
      <Layout style={styles.form}>
        <Text>No Rekam Medis : {form.noRekamMedis}</Text>
      </Layout>
      <Layout style={styles.form}>
        <Text>Tanggal Lahir : {form.tanggalLahir}</Text>
      </Layout>
      <Layout style={styles.form}>
        <Text>Dokter : {form.dokter}</Text>
      </Layout>
      <Layout style={styles.form}>
        <Text>Poliklinik : {form.poliklinik}</Text>
      </Layout>
      {form.status === 0 ? <RenderPribadi /> : <RenderPenjamin />}
      <Layout style={styles.form}>
        <Input
          label='Telp'
          placeholder='Masukkan Telp'
          value={telp}
          onChangeText={text => setTelp(text)}
          keyboardType='number-pad'
        />
      </Layout>
      <Layout
        style={[
          styles.form,
          { flexDirection: 'row', justifyContent: 'space-between' }
        ]}
      >
        <Button
          status='success'
          onPress={() => setStep(prevStep => prevStep - 1)}
          style={{ width: '45%' }}
        >
          Back
        </Button>
        <Button status='success' onPress={handleForm} style={{ width: '45%' }}>
          Simpan
        </Button>
      </Layout>
    </React.Fragment>
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

export default RegistrasiPoliklinik2;
