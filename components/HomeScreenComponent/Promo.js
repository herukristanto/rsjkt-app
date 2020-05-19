import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Spinner, Text, Layout, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import { baseAxios } from '../../utils/useAxios';

const { width, height } = Dimensions.get('screen');

const Promo = () => {
  const [sliders, setSliders] = useState([]);
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setError(false);
    const loadSliders = async () => {
      try {
        const { data: dataSlider } = await baseAxios.get('/get', {
          params: {
            p: 'promo',
          },
        });
        setSliders(dataSlider);
      } catch (error) {
        setError(true);
      }
    };
    loadSliders();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Promo', { promo: item })}
      >
        <Image
          source={{ uri: item.url }}
          resizeMode='stretch'
          style={{
            width: width * 0.5,
            height: '100%',
          }}
          width={width * 0.5}
          height='100%'
        />
      </TouchableOpacity>
    );
  };

  if (error) {
    return (
      <Layout
        style={{
          height: height * 0.17,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Error</Text>
      </Layout>
    );
  }

  if (sliders.length === 0) {
    return (
      <Layout
        style={{
          height: height * 0.17,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spinner status='success' />
      </Layout>
    );
  }

  return (
    <Layout style={{ height: height * 0.17 }}>
      <Layout style={styles.textContainer}>
        <Layout>
          <Text style={{ fontWeight: 'bold' }}>Promo</Text>
          <Text style={{ fontSize: 12 }}>Promo yang sedang berlangsung</Text>
        </Layout>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate('ListPromo')}
        >
          <Icon
            style={{ width: 24, height: 24 }}
            name='arrow-ios-forward'
            fill='rgb(7,94,85)'
          />
        </TouchableOpacity>
      </Layout>
      <FlatList
        contentContainerStyle={{
          overflow: 'hidden',
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={sliders}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={renderItem}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  item: {
    margin: 3,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});

export default Promo;
