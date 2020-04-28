import React, { useEffect, useState } from 'react';
import { Layout, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet, Image, Dimensions } from 'react-native';

import { baseAxios } from '../utils/useAxios';

const { width } = Dimensions.get('screen');

const PromoScreen = () => {
  const [promo, setPromo] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setError(false);
    const loadSliders = async () => {
      try {
        const { data: dataSlider } = await baseAxios.get('/get', {
          params: {
            p: 'promo',
          },
        });
        setPromo(dataSlider[0]);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    loadSliders();
  }, []);

  if (loading) {
    <Layout style={styles.screen}>
      <Spinner status='success' />
    </Layout>;
  }

  return (
    <Layout style={styles.screen}>
      <Image
        source={{ uri: promo.url }}
        style={{ width: width, height: 300 }}
        resizeMode='contain'
      />
      <Text>
        Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor
        risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
        posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
        ullamcorper sit amet ligula.
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default PromoScreen;
