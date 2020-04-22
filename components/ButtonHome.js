import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import { Avatar, Text } from '@ui-kitten/components';

const { width } = Dimensions.get('screen');

const ButtonHome = ({ onPressHandler, label, avatar }) => {
  return (
    <AwesomeButton
      backgroundColor='white'
      borderColor='#075e55'
      borderWidth={3}
      onPress={onPressHandler}
      width={width * 0.9}
      height={70}
    >
      <View style={styles.card}>
        <View style={styles.iconButton}>
          <Avatar source={avatar} size='giant' />
        </View>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonText} category='h5'>
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
    color: 'rgb(7,94,85)',
  },
});

export default ButtonHome;
