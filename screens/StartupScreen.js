import React, { useContext, useEffect, useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import * as Updates from 'expo-updates';
import NetInfo from '@react-native-community/netinfo';

import { AppContext } from '../context/AppContext';
import { FINISHED } from '../reducer/AppReducer';

const StartupScreen = () => {
  const { dispatch } = useContext(AppContext);
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState();

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
          } else {
            dispatch({
              type: FINISHED,
            });
          }
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
