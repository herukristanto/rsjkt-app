import React, { useMemo } from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const Card = ({ children, onPressHandler }) => {
  const styl = useMemo(
    () =>
      StyleSheet.create({
        button: {
          alignItems: 'center',
          width: width * 0.4,
          backgroundColor: 'rgb(7,94,85)',
          borderColor: 'gray',
          borderWidth: 1,
          marginVertical: 15,
          borderRadius: 10,
          paddingVertical: 8,
          elevation: 10,
        },
      }),
    []
  );

  return (
    <TouchableOpacity style={styl.button} onPress={onPressHandler}>
      {children}
    </TouchableOpacity>
  );
};

export default Card;
