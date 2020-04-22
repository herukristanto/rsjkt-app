import React, { useRef, useState, useEffect } from 'react';
import { FlatList, Image, Dimensions, View } from 'react-native';

const { width } = Dimensions.get('screen');

const Slider = ({ sliders }) => {
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
    <View style={{ flex: 0.5 }}>
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
    </View>
  );
};

export default Slider;
