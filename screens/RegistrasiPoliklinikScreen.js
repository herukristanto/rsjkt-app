import React, { useState } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Layout } from '@ui-kitten/components';

import RegistrasiPoliklinik1 from '../components/RegistrasiPoliklinik/RegistrasiPoliklinik1';
import RegistrasiPoliklinik2 from '../components/RegistrasiPoliklinik/RegistrasiPoliklinik2';
import RegistrasiPoliklinik3 from '../components/RegistrasiPoliklinik/RegistrasiPoliklinik3';
import { PoliklinikContextProvider } from '../context/PoliklinikContext';

const RegistrasiPoliklinik = props => {
  const [step, setStep] = useState(1);

  return (
    <PoliklinikContextProvider>
      <Layout style={styles.screen}>
        <ScrollView>
          <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
            keyboardVerticalOffset={150}
          >
            {step === 1 && <RegistrasiPoliklinik1 setStep={setStep} />}
            {step === 2 && <RegistrasiPoliklinik2 setStep={setStep} />}
            {step === 3 && (
              <RegistrasiPoliklinik3
                setStep={setStep}
                navigation={props.navigation}
              />
            )}
          </KeyboardAvoidingView>
        </ScrollView>
      </Layout>
    </PoliklinikContextProvider>
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
