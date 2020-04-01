import React, { useState } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Layout } from '@ui-kitten/components';

import RegistrasiPoliklinik1 from '../components/RegistrasiPoliklinik/RegistrasiPoliklinik1';
import RegistrasiPoliklinik2 from '../components/RegistrasiPoliklinik/RegistrasiPoliklinik2';
import RegistrasiPoliklinik3 from '../components/RegistrasiPoliklinik/RegistrasiPoliklinik3';

const RegistrasiPoliklinik = props => {
  const [form, setForm] = useState({
    dokter: '',
    poliklinik: '',
    tanggal: '',
    status: 0,
    jaminan: '',
    perusahaan: '',
    noKartu: '',
    telp: ''
  });
  const [step, setStep] = useState(1);

  console.log(form);

  return (
    <Layout style={styles.screen}>
      <ScrollView>
        <KeyboardAvoidingView
          style={styles.container}
          behavior='padding'
          keyboardVerticalOffset={150}
        >
          {step === 1 && (
            <RegistrasiPoliklinik1
              form={form}
              setStep={setStep}
              setForm={setForm}
            />
          )}
          {step === 2 && (
            <RegistrasiPoliklinik2
              form={form}
              setStep={setStep}
              setForm={setForm}
              form={form}
            />
          )}
          {step === 3 && (
            <RegistrasiPoliklinik3
              form={form}
              setStep={setStep}
              setForm={setForm}
              form={form}
              navigation={props.navigation}
            />
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default RegistrasiPoliklinik;
