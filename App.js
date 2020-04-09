import React, { useState, useEffect } from 'react';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import { mapping, light as LightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as Updates from 'expo-updates';
import NetInfo from '@react-native-community/netinfo';

import { default as appTheme } from './assets/theme.json';
const theme = { ...LightTheme, ...appTheme };

import RootNavigation from './navigations/RootNavigation';
import { AppContextProvider } from './context/AppContext';

export default function App() {
  const [checkUpdate, setCheckUpdate] = useState(true);
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function checkUpdate() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          setIsNew(true);
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        } else {
          setCheckUpdate(false);
        }
      } catch (error) {
        setError(JSON.stringify(error, null, 2));
        return;
      }
    }
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        checkUpdate();
      } else {
        setError('No Internet Connection');
        return;
      }
    });
  }, []);

  const Status = () => {
    let status;
    if (error) {
      status = error;
    } else if (isNew) {
      status = 'Updating...';
    } else {
      status = 'Loading...';
    }
    return (
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text>{status}</Text>
      </Layout>
    );
  };

  return (
    <ApplicationProvider mapping={mapping} theme={theme}>
      <AppContextProvider>
        <IconRegistry icons={EvaIconsPack} />
        {checkUpdate ? <Status /> : <RootNavigation />}
      </AppContextProvider>
    </ApplicationProvider>
  );
}
