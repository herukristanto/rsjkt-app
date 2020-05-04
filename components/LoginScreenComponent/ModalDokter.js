import React, { useState } from 'react';
import { StyleSheet, Dimensions, Alert, AsyncStorage } from 'react-native';
import { Layout, Input, Button } from '@ui-kitten/components';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

import { LOGIN } from '../../reducer/AppReducer';
import LoadingOverlay from '../LoadingOverlay';

const { width } = Dimensions.get('screen');

const ModalDokter = ({ showModal, dataDokter, setShowModal, dispatch }) => {
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handlePassword = async () => {
    setLoading(true);
    if (dataDokter.Password === password) {
      const userData = {
        idDokter: dataDokter.PERSONILID,
        namaDokter: dataDokter.NMPERSONIL.trim(),
        poli: dataDokter.poli,
        avatar: dataDokter.img,
        role: 'dokter',
      };

      await AsyncStorage.setItem('_USERDATA_', JSON.stringify(userData));
      dispatch({ type: LOGIN, user: userData });

      navigation.popToTop();
    } else {
      setLoading(false);
      Alert.alert('Peringatan', 'Password Anda Salah', [{ text: 'OK' }]);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setPassword('');
  };

  return (
    <Modal
      backdropColor='white'
      isVisible={showModal}
      coverScreen
      onBackButtonPress={handleClose}
    >
      <Layout
        style={[
          styles.screen,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Layout style={styles.form}>
          <Input
            value={password}
            label='Password'
            placeholder='Masukkan Password'
            secureTextEntry
            onChangeText={(nextValue) => setPassword(nextValue)}
          />
        </Layout>
        <Button
          status='success'
          onPress={handlePassword}
          style={{ width: 'auto' }}
        >
          Submit
        </Button>
      </Layout>
      {loading && <LoadingOverlay />}
    </Modal>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  form: {
    width: width * 0.8,
    marginVertical: 4,
  },
});

export default ModalDokter;
