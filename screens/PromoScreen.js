import React, { useEffect, useState } from 'react';
import { Layout, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet, Image, Dimensions, Alert, ScrollView } from 'react-native';

import { baseAxios } from '../utils/useAxios';
import { useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('screen');

const PromoScreen = () => {
  const [promo, setPromo] = useState();
  const [error, setError] = useState(false);
  const route = useRoute();

  useEffect(() => {
    setError(false);
    const loadSliders = async () => {
      try {
        const singlePromo = route.params.promo;
        setPromo(singlePromo);
      } catch (error) {
        Alert.alert(
          'Error',
          'Something Wrong! Please contact customer service!'
        );
      }
    };
    loadSliders();
  }, []);

  if (!promo) {
    return (
      <Layout
        style={[
          styles.screen,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Spinner status='success' />
      </Layout>
    );
  }

  return (
    <Layout style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{ uri: promo.url }}
          style={{ width: width, height: 300 }}
          resizeMode='contain'
        />
        <Text>{promo.text}</Text>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    padding: 10,
    alignItems: 'center',
  },
});

export default PromoScreen;
