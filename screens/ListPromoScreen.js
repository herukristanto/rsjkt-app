import React, { useState, useEffect } from 'react';
import { Layout, Spinner } from '@ui-kitten/components';
import { StyleSheet, ScrollView, Image, Dimensions, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ListPromoScreen = () => {
  const [promo, setPromo] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();

  const getSize = async () => {
    try {
      const images = route.params.data;
      for (let index = 0; index < images.length; index++) {
        const promise = new Promise(
          (resolve, reject) => {
            Image.getSize(
              images[index].url,
              (width, height) => {
                resolve({ width, height });
              },
              (error) => {
                Alert.alert(
                  'Maaf',
                  'Something Wrong! Please Contact Customer Service!',
                  [
                    {
                      text: 'OK',
                      onPress: () => navigation.goBack(),
                    },
                  ]
                );
              }
            );
          },
          (error) => {
            throw error;
          }
        );
        const { width, height } = await promise;
        images[index].width = width;
        images[index].height = height;
      }
      setLoading(false);
      setPromo(images);
    } catch (error) {
      Alert.alert('Maaf', 'Something Wrong! Please Contact Customer Service!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    }
  };

  useEffect(() => {
    getSize();
  }, []);

  if (loading) {
    <Layout style={styles.screen}>
      <Spinner status='success' />
    </Layout>;
  }

  return (
    <Layout style={styles.screen}>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        {promo.map((data) => {
          const ratio = width / data.width;
          return (
            <Layout key={data.id}>
              <Image
                source={{ uri: data.url }}
                style={styles.promo}
                resizeMode='stretch'
                width={width}
                height={data.height * ratio}
              />
            </Layout>
          );
        })}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginVertical: 5,
  },
  promo: {
    marginVertical: 5,
  },
});

export default ListPromoScreen;
