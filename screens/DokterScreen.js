import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Layout, Button, Text } from '@ui-kitten/components';

const { width } = Dimensions.get('screen');

const DokterScreen = (props) => {
  const { navigation } = props;

  return (
    <Layout style={styles.screen}>
      <Text>Jumlah Pasien Hari ini : </Text>
      <Text>80 Pasien</Text>
      <Text>Jumlah Pasien Besok : </Text>
      <Text>0 Pasien</Text>
      <Layout style={styles.form}>
        <Button onPress={() => navigation.popToTop()} status='success'>
          Logout
        </Button>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: width * 0.8,
    marginVertical: 4,
  },
});

export default DokterScreen;
