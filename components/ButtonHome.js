import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import { Avatar, Text } from '@ui-kitten/components';

const { width } = Dimensions.get('screen');

const ButtonHome = ({ onPressHandler, label, avatar }) => {
  return (
    <AwesomeButton
      backgroundColor='rgb(7,94,85)'
      onPress={onPressHandler}
      style={{
        marginVertical: 10,
      }}
      width={width * 0.65}
    >
      <View style={styles.card}>
        <View style={styles.iconButton}>
          <Avatar source={avatar} size='medium' />
        </View>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonText} category='h6'>
            {label}
          </Text>
        </View>
      </View>
    </AwesomeButton>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconButton: {
    width: '25%',
    marginLeft: '10%',
  },
  buttonTextContainer: {
    width: '65%',
  },
  buttonText: {
    color: 'white',
  },
});

export default ButtonHome;
