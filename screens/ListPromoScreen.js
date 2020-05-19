import React, { useState, useEffect } from 'react';
import { Layout, Spinner } from '@ui-kitten/components';
import {
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { baseAxios } from '../utils/useAxios';

const { width } = Dimensions.get('window');

const dummyImage = [
  {
    id: 6,
    name: 'Promo',
    url:
      'https://lh3.googleusercontent.com/proxy/lBD5bQoT4GQqykUKcu8Xo8ZR5zTwWGHLbzPtHDI_41FOtDUsiHvWmPWQ57rTA0N_WsAl3yEnanaxQhvIsN4edCn87bW4J60dYQqCn-_wXK3-wc1b9M4abpl5',
    active: 1,
  },
  {
    id: 7,
    name: 'Promo',
    url: 'https://kirim.email/wp-content/uploads/2018/02/mm.png',
    active: 1,
  },
  {
    id: 8,
    name: 'Promo',
    url:
      'https://res.cloudinary.com/demo/image/upload/w_250,h_250,c_mfit/w_700/sample.jpg',
    active: 1,
  },
];

const ListPromoScreen = () => {
  const [promo, setPromo] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const getSize = async () => {
    try {
      const { data } = await baseAxios.get('/get', {
        params: {
          p: 'promo',
        },
      });

      const images = data;
      // const images = dummyImage;
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
            <TouchableOpacity
              onPress={() => navigation.navigate('Promo', { promo: data })}
              key={data.id}
            >
              <Image
                source={{ uri: data.url }}
                style={styles.promo}
                resizeMode='stretch'
                width={width}
                height={data.height * ratio}
              />
            </TouchableOpacity>
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
