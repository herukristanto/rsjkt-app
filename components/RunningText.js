import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AutoScrolling from 'react-native-auto-scrolling';

const RunningText = ({ text }) => {
  return (
    <View style={styles.container}>
      <AutoScrolling style={styles.scrolling2} duration={6000}>
        <Text style={styles.welcome}>{text}</Text>
      </AutoScrolling>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(7,94,85)',
  },
  scrolling2: {
    backgroundColor: 'rgb(7,94,85)',
    width: 400,
  },
  welcome: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
});

export default RunningText;
