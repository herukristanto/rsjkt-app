import React, { useState } from 'react';
import { ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Layout } from '@ui-kitten/components';

import RegisterForm1 from '../components/RegistrasiForm/RegisterForm1';
import RegisterForm2 from '../components/RegistrasiForm/RegisterForm2';
import RegisterForm3 from '../components/RegistrasiForm/RegisterForm3';
import RegisterForm4 from '../components/RegistrasiForm/RegisterForm4';

const RegisterScreen = props => {
  const [form, setForm] = useState({
    namaLengkap: '',
    namaPanggilan: '',
    identitas: '',
    noIndentitas: '',
    tanggalLahir: new Date(),
    kelamin: 0,
    darah: '',
    pendidikan: '',
    agama: '',
    alamat: '',
    rt: '',
    rw: '',
    kota: '',
    kodePos: '',
    telp: '',
    telp2: '',
    email: '',
    alamatKeluarga: '',
    rtKeluarga: '',
    rwKeluarga: '',
    kotaKeluarga: '',
    kodePosKeluarga: '',
    telpKeluarga: '',
    telp2Keluarga: '',
    emailKeluarga: '',
    namaAyah: '',
    pekerjaanAyah: '',
    namaIbu: '',
    pekerjaan: '',
    namaPekerjaan: '',
    alamatPekerjaan: '',
    telpPekerjaan: '',
    departemen: '',
    jabatan: ''
  });
  const [step, setStep] = useState(1);

  console.log(form);

  return (
    <Layout style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
        keyboardVerticalOffset={80}
        enabled
      >
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
          {step === 1 && (
            <RegisterForm1 setStep={setStep} setForm={setForm} form={form} />
          )}
          {step === 2 && (
            <RegisterForm2 setStep={setStep} setForm={setForm} form={form} />
          )}
          {step === 3 && (
            <RegisterForm3 setStep={setStep} setForm={setForm} form={form} />
          )}
          {step === 4 && (
            <RegisterForm4
              form={form}
              setStep={setStep}
              setForm={setForm}
              navigation={props.navigation}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 10
  },
  container: {
    flex: 1
  }
});

export default RegisterScreen;
