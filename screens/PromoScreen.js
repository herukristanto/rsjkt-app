import React, { useEffect, useState } from 'react';
import { Layout, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet, Image, Dimensions, Alert, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const { width: widthScreen } = Dimensions.get('screen');

const PromoScreen = () => {
  const [promo, setPromo] = useState();
  const [imgHeight, setImgHeight] = useState();
  const [error, setError] = useState(false);
  const route = useRoute();

  useEffect(() => {
    setError(false);
    const loadSliders = async () => {
      try {
        const singlePromo = route.params.promo;

        Image.getSize(
          singlePromo.url,
          (width, height) => {
            const ratio = widthScreen / width;
            const imageHeight = height * ratio;
            setImgHeight(imageHeight);
          },
          (error) => {
            console.error(`Couldn't get the image size: ${error.message}`);
          }
        );

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
          style={{ width: widthScreen, height: imgHeight }}
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
