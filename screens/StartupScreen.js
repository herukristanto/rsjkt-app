import React, { useContext, useEffect, useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet, AsyncStorage } from 'react-native';
import * as Updates from 'expo-updates';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';

import { AppContext } from '../context/AppContext';
import { FINISHED, INITIAL_LOGIN } from '../reducer/AppReducer';

const StartupScreen = () => {
  const { state, dispatch } = useContext(AppContext);
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState();
  const navigation = useNavigation();

  if (!state.loading) {
    if (state.isLogin && state.user.role === 'dokter') {
      navigation.replace('DokterNavigation');
    } else {
      navigation.replace('HomeNavigation');
    }
  }

  useEffect(() => {
    const checkAndUpdate = async () => {
      try {
        if (!__DEV__) {
          // Run only on Prod
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            setIsNew(true);
            await Updates.fetchUpdateAsync();
            await Updates.reloadAsync();
          }
        }

        const userData = await AsyncStorage.getItem('_USERDATA_');
        if (userData !== null) {
          dispatch({
            type: INITIAL_LOGIN,
            user: JSON.parse(userData),
          });
        } else {
          dispatch({
            type: FINISHED,
          });
        }
      } catch (error) {
        setError(JSON.stringify(error, null, 2));
        return;
      }
    };
    NetInfo.fetch().then((state) => {
      if (state.isConnected && state.isInternetReachable) {
        checkAndUpdate();
      } else {
        setError('No Internet Connection');
        return;
      }
    });
  }, []);

  let status;
  if (error) {
    status = error;
  } else if (isNew) {
    status = 'Updating...';
  } else {
    status = 'Loading...';
  }

  return (
    <Layout style={styles.screen}>
      <Text>{status}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
