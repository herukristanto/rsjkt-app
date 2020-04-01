import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Layout, Text, Input, Button } from '@ui-kitten/components';

const RegisterForm4 = props => {
  const { setForm, setStep, navigation, form } = props;

  const [pekerjaan, setPekerjaan] = useState(form.pekerjaan);
  const [namaPekerjaan, setNamaPekerjaan] = useState(form.namaPekerjaan);
  const [alamatPekerjaan, setAlamatPekerjaan] = useState(form.alamatPekerjaan);
  const [telpPekerjaan, setTelpPekerjaan] = useState(form.telpPekerjaan);
  const [departemen, setDepartemen] = useState(form.departemen);
  const [jabatan, setJabatan] = useState(form.jabatan);

  const handleForm = () => {
    setForm(prevForm => {
      return {
        ...prevForm,
        pekerjaan,
        namaPekerjaan,
        alamatPekerjaan,
        telpPekerjaan,
        departemen,
        jabatan
      };
    });
    setStep(0);
    Alert.alert('Berhasil', 'Data Berhasil Disimpan', [
      { text: 'OK', onPress: () => navigation.popToTop() }
    ]);
  };

  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  return (
    <React.Fragment>
      <Text category='h4'>Data Pekerjaan</Text>
      <Layout style={styles.form}>
        <Input
          label='Pekerjaan'
          placeholder='Masukkan Pekerjaan'
          value={pekerjaan}
          onChangeText={text => setPekerjaan(text)}
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Nama Pekerjaan'
          placeholder='Masukkan Nama Pekerjaan'
          value={namaPekerjaan}
          onChangeText={text => setNamaPekerjaan(text)}
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Alamat'
          placeholder='Masukkan Alamat'
          multiline={true}
          value={alamatPekerjaan}
          onChangeText={text => setAlamatPekerjaan(text)}
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Telp'
          placeholder='Masukkan Telp'
          value={telpPekerjaan}
          onChangeText={text => setTelpPekerjaan(text)}
          keyboardType='number-pad'
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Dept / Bagian'
          placeholder='Masukkan Dept / Bagian'
          value={departemen}
          onChangeText={text => setDepartemen(text)}
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Jabatan'
          placeholder='Masukkan Jabatan'
          value={jabatan}
          onChangeText={text => setJabatan(text)}
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
        <Button
          onPress={handleForm}
          status='success'
          style={{ width: '40%', marginVertical: 10 }}
        >
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

export default RegisterForm4;
