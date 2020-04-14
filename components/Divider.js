import React from 'react';
import { StyleSheet, View } from 'react-native';

const Divider = (props) => {
  return <View {...props} style={styles.lineStyle} />;
};

const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    margin: 10,
    width: '90%',
  },
});

export default Divider;
