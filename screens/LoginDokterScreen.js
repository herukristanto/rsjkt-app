import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Image
} from 'react-native';
import { Layout, Input, Button } from '@ui-kitten/components';

const { width } = Dimensions.get('screen');

const LoginDokterScreen = props => {
  const { navigation } = props;

  const [kodeDokter, setKodeDokter] = useState('');

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
            label='Kode Dokter'
            placeholder='Masukkan Kode Dokter'
            value={kodeDokter}
            onChangeText={text => setKodeDokter(text)}
          />
        </Layout>
        <Layout style={styles.form}>
          <Button
            onPress={() => navigation.navigate('Dokter')}
            status='success'
          >
            Login
          </Button>
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

export default LoginDokterScreen;
