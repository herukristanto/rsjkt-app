import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { Layout, Text, Icon } from '@ui-kitten/components';
import { StyleSheet, Alert, TouchableOpacity } from 'react-native';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';

import LoadingOverlay from '../LoadingOverlay';
import { baseAxios } from '../../utils/useAxios';
import { useNavigation } from '@react-navigation/native';
import Divider from '../Divider';

const ModalFeedback = ({ showModal, dataModal, handleClose }) => {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async (star) => {
    try {
      setFeedback(star);
      setLoading(true);

      // Check internet connection
      const connect = await NetInfo.fetch();
      if (!connect.isConnected && !connect.isInternetReachable) {
        Alert.alert('Error', 'No Internet Connection', [{ text: 'Retry' }]);
        return;
      }

      const request = {
        rm: dataModal.Nomor_Cm,
        generalkey: dataModal.No_reg,
        poli_id: dataModal.Poli_id,
        dokter_id: dataModal.Dokter_id,
        tgl_pesan: dataModal.Tgl_Pesan,
        jam: dataModal.Jam,
        feedback: star,
      };

      const { data } = await baseAxios.post('feedback', request);

      Alert.alert('Berhasil', 'Ulasan Berhasil Disimpan', [
        { text: 'Okay', onPress: () => navigation.goBack() },
      ]);

      setLoading(false);
      handleClose();
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Something Wrong! Please contact customer service!');
    }
  };

  const closeModal = () => {
    setFeedback('');
    handleClose();
  };

  const StarFeedback = ({ starFeedback }) => {
    const stars = [1, 2, 3, 4, 5];
    return (
      <Layout style={styles.starsContainer}>
        {stars.map((star) => {
          return (
            <TouchableOpacity
              key={star}
              disabled={starFeedback ? true : false}
              onPress={() => handleSubmit(star)}
            >
              {star <= feedback || star <= starFeedback ? (
                <Icon name='star' width={32} height={32} fill='#ffcc00' />
              ) : (
                <Icon name='star-outline' width={32} height={32} />
              )}
            </TouchableOpacity>
          );
        })}
      </Layout>
    );
  };

  return (
    <Modal
      backdropColor='white'
      isVisible={showModal}
      coverScreen
      onBackButtonPress={closeModal}
    >
      <Layout style={styles.modalContainer}>
        <Layout
          style={[styles.textContainer, { justifyContent: 'space-between' }]}
        >
          <Layout style={{ flexDirection: 'row' }}>
            <Text style={{ width: '40%' }}>Poli</Text>
            <Text>: {dataModal.Poli_nm}</Text>
          </Layout>
          <Text>
            {moment(dataModal.Tanggal).format('DD MMMM YYYY')}, {dataModal.Jam}
          </Text>
        </Layout>
        <Layout style={styles.textContainer}>
          <Text style={{ width: '20%' }}>Dokter</Text>
          <Text>: {dataModal.dokter_nm}</Text>
        </Layout>
        <Layout style={styles.textContainer}>
          <Text style={{ width: '20%' }}>No. Reg</Text>
          <Text>: {dataModal.Generalkey}</Text>
        </Layout>
        <Divider />

        <StarFeedback starFeedback={dataModal.Feedback} />
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
    flexDirection: 'row',
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
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});

export default ModalFeedback;
