import React, { useRef, useState, useEffect } from 'react';
import { FlatList, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

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
    }, 10000);

    return () => {
      clearInterval(slideTimer);
    };
  }, [slideIndex]);

  return (
    <FlatList
      contentContainerStyle={{
        overflow: 'hidden',
      }}
      ref={slides}
      horizontal
      pagingEnabled
      scrollEnabled
      showsHorizontalScrollIndicator={false}
      data={images}
      keyExtractor={(item, index) => `${item}-${index}`}
      renderItem={({ item }) => (
        <Image
          source={item}
          resizeMode='stretch'
          style={{
            width,
          }}
        />
      )}
    />
  );
};

export default Slider;
