import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { Image, StyleSheet, Dimensions, Alert } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const { width: widthScreen } = Dimensions.get('screen');

const ModalImageDokter = ({ showModal, dataModal, handleClose }) => {
  const navigation = useNavigation();
  const [imgHeight, setImgHeight] = useState();

  useEffect(() => {
    const getHeight = async () => {
      try {
        if (dataModal) {
          Image.getSize(
            dataModal,
            (width, height) => {
              const ratio = (widthScreen - 20) / width;
              const imageHeight = height * ratio;
              setImgHeight(imageHeight);
            },
            (error) => {
              Alert.alert(
                'Error',
                'Something Wrong! Please Contact Customer Service!',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
              );
              return;
            }
          );
        }
      } catch (error) {
        Alert.alert(
          'Error',
          'Something Wrong! Please contact customer service!',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      }
    };
    getHeight();
  }, [dataModal]);

  return (
    <Modal
      backdropColor='black'
      isVisible={showModal}
      coverScreen
      onBackButtonPress={handleClose}
      onBackdropPress={handleClose}
    >
      <Layout style={styles.container}>
        <Image
          source={{ uri: dataModal }}
          style={{ width: widthScreen - 20, height: imgHeight }}
          resizeMode='contain'
        />
      </Layout>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModalImageDokter;
