import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Input, Button } from '@ui-kitten/components';

const RegisterForm2 = props => {
  const { setForm, setStep, form } = props;

  const [alamat, setAlamat] = useState(form.alamat);
  const [rt, setRt] = useState(form.rt);
  const [rw, setRw] = useState(form.rw);
  const [kota, setKota] = useState(form.kota);
  const [kodePos, setKodePos] = useState(form.kodePos);
  const [telp, setTelp] = useState(form.telp);
  const [telp2, setTelp2] = useState(form.telp2);
  const [email, setEmail] = useState(form.email);

  const handleForm = () => {
    setForm(prevForm => {
      return {
        ...prevForm,
        alamat,
        rt,
        rw,
        kota,
        kodePos,
        telp,
        telp2,
        email
      };
    });
    setStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  return (
    <React.Fragment>
      <Text category='h4'>Alamat</Text>
      <Layout style={styles.form}>
        <Input
          label='Alamat'
          placeholder='Masukkan Alamat'
          multiline={true}
          value={alamat}
          onChangeText={text => setAlamat(text)}
        />
      </Layout>
      <Layout
        style={[
          styles.form,
          { flexDirection: 'row', justifyContent: 'space-between' }
        ]}
      >
        <Input
          label='RT'
          placeholder='Masukkan RT'
          value={rt}
          onChangeText={text => setRt(text)}
          keyboardType='number-pad'
          style={{ width: '48%' }}
        />
        <Input
          label='RW'
          placeholder='Masukkan RW'
          value={rw}
          onChangeText={text => setRw(text)}
          keyboardType='number-pad'
          style={{ width: '48%' }}
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Kota'
          placeholder='Masukkan Kota'
          value={kota}
          onChangeText={text => setKota(text)}
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Kode Pos'
          placeholder='Masukkan Kode Pos'
          value={kodePos}
          onChangeText={text => setKodePos(text)}
          keyboardType='number-pad'
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Telp'
          placeholder='Masukkan Telp'
          value={telp}
          onChangeText={text => setTelp(text)}
          keyboardType='number-pad'
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Telp 2'
          placeholder='Masukkan Telp 2'
          value={telp2}
          onChangeText={text => setTelp2(text)}
          keyboardType='number-pad'
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Email'
          placeholder='Masukkan Email'
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType='email-address'
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
          Next
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

export default RegisterForm2;
