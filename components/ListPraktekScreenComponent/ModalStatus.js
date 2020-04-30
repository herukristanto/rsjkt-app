import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import { StyleSheet, Alert } from 'react-native';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';

import LoadingOverlay from '../LoadingOverlay';
import { baseAxios } from '../../utils/useAxios';
import { useNavigation } from '@react-navigation/native';

const ModalStatus = ({ showModal, dataModal, handleClose }) => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Check internet connection
      const connect = await NetInfo.fetch();
      if (!connect.isConnected && !connect.isInternetReachable) {
        Alert.alert('Error', 'No Internet Connection', [{ text: 'Retry' }]);
        return;
      }

      if (!status) {
        Alert.alert('Peringatan', 'Status Tidak Boleh Kosong');
        return;
      }
      if (status.length > 50) {
        Alert.alert(
          'Peringatan',
          'Jumlah Karakter Terlalu Panjang. Maksimal 50 Karakter'
        );
        return;
      }

      const request = {
        dokter_id: dataModal.Dokter_ID,
        poli_id: dataModal.Poli_ID,
        tanggal: dataModal.Tanggal,
        dayofweek: dataModal.DayofWeek,
        jam_awalfix: dataModal.Jam_AwalFix.trim(),
        status: status,
      };

      const { data } = await baseAxios.post('status', request);

      Alert.alert('Berhasil', 'Status Berhasil Disimpan', [
        { text: 'Okay', onPress: () => navigation.goBack() },
      ]);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Something Wrong! Please contact customer service!');
    }
  };

  const closeModal = () => {
    setStatus('');
    handleClose();
  };

  return (
    <Modal
      backdropColor='white'
      isVisible={showModal}
      coverScreen
      onBackButtonPress={closeModal}
    >
      <Layout style={styles.modalContainer}>
        <Layout style={styles.textContainer}>
          <Text>Status</Text>
          <Text>Tanggal {moment(dataModal.Tanggal).format('DD/MM/YYYY')}</Text>
        </Layout>
        <Layout style={styles.form}>
          <Input
            value={status}
            placeholder='Masukkan Status'
            onChangeText={(text) => setStatus(text)}
          />
        </Layout>
        <Layout style={styles.buttonContainer}>
          <Button status='success' style={styles.button} onPress={handleSubmit}>
            Submit
          </Button>
        </Layout>
      </Layout>
      {loading && <LoadingOverlay />}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    marginHorizontal: 10,
  },

  form: {
    marginVertical: 4,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginHorizontal: 10,
  },
  button: {
    width: '30%',
  },
});

export default ModalStatus;
