import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { Layout } from '@ui-kitten/components';

import RegistrasiPoliklinik1 from '../components/RegistrasiPoliklinikScreenComponent/RegistrasiPoliklinik1';
import RegistrasiPoliklinik2 from '../components/RegistrasiPoliklinikScreenComponent/RegistrasiPoliklinik2';
import RegistrasiPoliklinik3 from '../components/RegistrasiPoliklinikScreenComponent/RegistrasiPoliklinik3';
import { PoliklinikContextProvider } from '../context/PoliklinikContext';
import UserName from '../components/UserName';
import { AppContext } from '../context/AppContext';
import FooterPoli from '../components/RegistrasiPoliklinikScreenComponent/FooterPoli';

const { width } = Dimensions.get('screen');

const RegistrasiPoliklinik = () => {
  const [step, setStep] = useState(1);
  const { state } = useContext(AppContext);

  return (
    <PoliklinikContextProvider>
      <Layout style={styles.screen}>
        <ScrollView>
          <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
            keyboardVerticalOffset={150}
          >
            <UserName name={state.user.namaPasien} style={styles.username} />
            {step === 1 && <RegistrasiPoliklinik1 setStep={setStep} />}
            {step === 2 && <RegistrasiPoliklinik2 setStep={setStep} />}
            {step === 3 && <RegistrasiPoliklinik3 setStep={setStep} />}
          </KeyboardAvoidingView>
        </ScrollView>
        <FooterPoli />
      </Layout>
    </PoliklinikContextProvider>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    backgroundColor: 'white',
    width,
    paddingLeft: 20,
    marginBottom: 10,
  },
});

export default RegistrasiPoliklinik;
