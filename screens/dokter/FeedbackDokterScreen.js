import React, { useState, useEffect, useContext } from 'react';
import { Layout, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet, Alert } from 'react-native';
import Constants from 'expo-constants';
import NetInfo from '@react-native-community/netinfo';
import { Rating } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';
import { baseAxios } from '../../utils/useAxios';
import { AppContext } from '../../context/AppContext';

const FeedbackDokterScreen = () => {
  const [feedback, setFeedback] = useState();
  const [loading, setLoading] = useState(true);
  const { state } = useContext(AppContext);
  const navigation = useNavigation();

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
      } catch (error) {
        Alert.alert(
          'Error',
          'Something Wrong! Please Contact Customer Service!',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      }
      setLoading(false);
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
        <Layout style={styles.feedbackContainer}>
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
          <Rating
            fractions={1}
            startingValue={parseFloat(feedback.mean.toFixed(1))}
            readonly
          />
        </Layout>
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
    justifyContent: 'center',
    flex: 1,
  },
  feedbackContainer: {
    backgroundColor: 'white',
    padding: 15,
  },
  text: {
    textAlign: 'center',
  },
});

export default FeedbackDokterScreen;
