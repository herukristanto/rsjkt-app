import React, { useState } from 'react';
import { ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Layout } from '@ui-kitten/components';

import RegisterForm1 from '../components/RegistrasiForm/RegisterForm1';
import RegisterForm2 from '../components/RegistrasiForm/RegisterForm2';
import RegisterForm3 from '../components/RegistrasiForm/RegisterForm3';
import RegisterForm4 from '../components/RegistrasiForm/RegisterForm4';
import { RegisterContextProvider } from '../context/RegisterContext';

const RegisterScreen = (props) => {
  const [step, setStep] = useState(1);

  return (
    <RegisterContextProvider>
      <Layout style={styles.screen}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior='padding'
          keyboardVerticalOffset={80}
          enabled
        >
          <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            {step === 1 && <RegisterForm1 setStep={setStep} />}
            {step === 2 && <RegisterForm2 setStep={setStep} />}
            {step === 3 && <RegisterForm3 setStep={setStep} />}
            {step === 4 && (
              <RegisterForm4 setStep={setStep} navigation={props.navigation} />
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </Layout>
    </RegisterContextProvider>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 10,
  },
  container: {
    flex: 1,
  },
});

export default RegisterScreen;
