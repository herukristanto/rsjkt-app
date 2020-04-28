import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AutoScrolling from 'react-native-auto-scrolling';

import { baseAxios } from '../utils/useAxios';

const RunningText = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    const loadText = async () => {
      try {
        const { data: dataText } = await baseAxios.get('/get', {
          params: {
            p: 'runtext',
          },
        });
        setText(dataText[0].runtext);
      } catch (error) {
        setText('Error');
      }
    };
    loadText();
  }, []);

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
    position: 'absolute',
    bottom: 0,
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
    margin: 5,
    fontFamily: 'calibri',
  },
});

export default RunningText;
