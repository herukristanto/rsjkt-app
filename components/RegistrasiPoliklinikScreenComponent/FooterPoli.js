import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const FooterPoli = () => {
  return (
    <Layout style={styles.container}>
      <Image
        source={require('../../assets/images/login-image.png')}
        style={{ width: width * 0.07, height: width * 0.07 }}
      />
      <Text style={styles.text}>RS Jakarta Mobile</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#075e55',
    paddingVertical: 5,
  },
  text: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
  },
});

export default FooterPoli;
