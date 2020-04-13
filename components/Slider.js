import React, { useRef, useState, useEffect } from 'react';
import { FlatList, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

const images = [
  require('../assets/images/rs1.jpg'),
  require('../assets/images/rs2.png'),
  require('../assets/images/rs3.jpg'),
];

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = useRef(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      let nextIndex = slideIndex;
      if (slideIndex < 2) {
        nextIndex = nextIndex + 1;
      } else {
        nextIndex = 0;
      }

      slides.current.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setSlideIndex(nextIndex);
    }, 3000);

    return () => {
      clearInterval(slideTimer);
    };
  }, [slideIndex]);

  return (
    <FlatList
      contentContainerStyle={{
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
      }}
      ref={slides}
      horizontal
      pagingEnabled
      scrollEnabled
      showsHorizontalScrollIndicator={false}
      snapToAlignment='center'
      data={images}
      keyExtractor={(item, index) => `${item}-${index}`}
      renderItem={({ item }) => (
        <Image
          source={item}
          resizeMode='contain'
          style={{
            width,
            height: height / 3,
            borderRadius: 10,
          }}
        />
      )}
    />
  );
};

export default Slider;
