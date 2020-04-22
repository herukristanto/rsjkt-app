import React, { useRef, useState, useEffect } from 'react';
import { FlatList, Image, Dimensions } from 'react-native';
import { Spinner, Text, Layout } from '@ui-kitten/components';
import { baseAxios } from '../utils/useAxios';

const { width } = Dimensions.get('screen');

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [sliders, setSliders] = useState([]);
  const [error, setError] = useState(false);
  const slides = useRef();

  useEffect(() => {
    setError(false);
    const loadSliders = async () => {
      try {
        const { data: dataSlider } = await baseAxios.get('/get', {
          params: {
            p: 'slider',
          },
        });
        setSliders(dataSlider);
      } catch (error) {
        setError(true);
      }
    };
    loadSliders();
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      if (sliders.length > 0) {
        let nextIndex = slideIndex;
        if (slideIndex < sliders.length - 1) {
          nextIndex = nextIndex + 1;
        } else {
          nextIndex = 0;
        }

        slides.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        setSlideIndex(nextIndex);
      }
    }, 3000);

    return () => {
      clearInterval(slideTimer);
    };
  }, [slideIndex, sliders]);

  if (error) {
    return (
      <Layout
        style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text>Error</Text>
      </Layout>
    );
  }

  if (sliders.length === 0) {
    return (
      <Layout
        style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
      >
        <Spinner status='success' />
      </Layout>
    );
  }

  return (
    <Layout style={{ flex: 0.5 }}>
      <FlatList
        contentContainerStyle={{
          overflow: 'hidden',
        }}
        ref={slides}
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        data={sliders}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.url }}
            resizeMode='stretch'
            style={{
              width,
            }}
            width={width}
          />
        )}
      />
    </Layout>
  );
};

export default Slider;
