import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import { Layout, Text, Input, Button } from '@ui-kitten/components';

const { width } = Dimensions.get('screen');

const LoginScreen = props => {
  const { navigation } = props;

  const [noRekamMedis, setNoRekamMedis] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior='padding'
      keyboardVerticalOffset={80}
    >
      <Layout style={styles.container}>
        <Layout style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/images/login-image.png')}
          />
        </Layout>
        <Layout style={styles.form}>
          <Input
            label='No Rekam Medis'
            placeholder='Masukkan No Rekam Medis'
            value={noRekamMedis}
            onChangeText={text => setNoRekamMedis(text)}
            keyboardType='number-pad'
          />
        </Layout>
        <Layout style={styles.form}>
          <Input
            secureTextEntry
            textContentType='password'
            label='Password'
            placeholder='Masukkan Password'
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </Layout>
        <Layout style={styles.form}>
          <Button
            onPress={() => navigation.navigate('RegistrasiPoliklinik')}
            status='success'
          >
            Login
          </Button>
        </Layout>
        <Layout style={[styles.form, { alignItems: 'center' }]}>
          <Text
            style={{ textDecorationLine: 'underline' }}
            onPress={() => navigation.navigate('Register')}
          >
            Belum Terdaftar?
          </Text>
        </Layout>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: width / 2,
    height: width / 2
  },
  image: {
    width: '100%',
    height: '100%'
  },
  form: {
    width: width * 0.8,
    marginVertical: 4
  }
});

export default LoginScreen;
