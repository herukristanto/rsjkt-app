import React, { useState, useEffect, useContext } from 'react';
import { Layout, Text, Icon, Spinner } from '@ui-kitten/components';
import { StyleSheet, Alert } from 'react-native';
import Constants from 'expo-constants';
import Stars from 'react-native-stars';
import NetInfo from '@react-native-community/netinfo';

import Header from '../../components/Header';
import { baseAxios } from '../../utils/useAxios';
import { AppContext } from '../../context/AppContext';

const FeedbackDokterScreen = () => {
  const [feedback, setFeedback] = useState();
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const getFeedback = async () => {
      try {
        // Check internet connection
        const connect = await NetInfo.fetch();
        if (!connect.isConnected && !connect.isInternetReachable) {
          Alert.alert('Error', 'No Internet Connection', [{ text: 'Retry' }]);
          return;
        }

        const { data } = await baseAxios.get('/FeedbackMean', {
          params: {
            dokter_id: state.user.idDokter,
          },
        });

        setFeedback(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getFeedback();
  }, []);

  if (loading) {
    return (
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Spinner status='success' />
      </Layout>
    );
  }

  return (
    <Layout style={styles.screen}>
      <Header />

      <Layout style={styles.container}>
        <Text style={styles.text} category='h1'>
          Jumlah Feedback
        </Text>
        <Text style={styles.text} status='success' category='h1'>
          {feedback.count}
        </Text>
        <Text style={styles.text} category='h1'>
          Nilai Feedback
        </Text>
        <Text style={styles.text} status='success' category='h1'>
          {feedback.mean.toFixed(2)}
        </Text>
        {/* <Stars
          display={parseInt(feedback.mean.toFixed(1))}
          spacing={8}
          count={5}
          starSize={40}
          fullStar={require('../../assets/images/starFilled.png')}
          emptyStar={require('../../assets/images/starEmpty.png')}
        /> */}
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default FeedbackDokterScreen;
