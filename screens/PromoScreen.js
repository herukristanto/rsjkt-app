import React, { useEffect, useState } from 'react';
import { Layout, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet, Image, Dimensions, Alert, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const { width: widthScreen } = Dimensions.get('screen');

const PromoScreen = () => {
  const [promo, setPromo] = useState();
  const [imgHeight, setImgHeight] = useState();
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
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
            Alert.alert(
              'Error',
              'Something Wrong! Please Contact Customer Service!',
              [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
            return;
          }
        );

        setPromo(singlePromo);
      } catch (error) {
        Alert.alert(
          'Error',
          'Something Wrong! Please contact customer service!',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
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
