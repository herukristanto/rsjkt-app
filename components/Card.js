import React from 'react';
import { Dimensions } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

const { width } = Dimensions.get('screen');

const Card = ({ children, onPressHandler }) => {
  return (
    <AwesomeButton
      backgroundColor='rgb(7,94,85)'
      onPress={onPressHandler}
      style={{
        marginVertical: 10,
      }}
      width={width * 0.6}
    >
      {children}
    </AwesomeButton>
  );
};

export default Card;
