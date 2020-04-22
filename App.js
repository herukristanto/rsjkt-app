import React, { useState, useEffect } from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { mapping, light as LightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as Updates from 'expo-updates';
import NetInfo from '@react-native-community/netinfo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { View, Text } from 'react-native';

import { default as appTheme } from './assets/theme.json';
const theme = { ...LightTheme, ...appTheme };

import RootNavigation from './navigations/RootNavigation';
import { AppContextProvider } from './context/AppContext';

const images = [
  require('./assets/images/login-image.png'),

  require('./assets/icon/cek-pendaftaran.png'),
  require('./assets/icon/lokasi.png'),
  require('./assets/icon/registrasi.png'),
];

const strictTheme = { ['text-font-family']: 'calibri' };
const customMapping = { strict: strictTheme };

export default function App() {
  const [checkUpdate, setCheckUpdate] = useState(true);
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState();

  const handleResourceAsync = async () => {
    const cacheImages = images.map((img) => {
      return Asset.fromModule(img).downloadAsync();
    });

    return Promise.all(cacheImages);
  };

  useEffect(() => {
    const checkAndUpdate = async () => {
      try {
        await handleResourceAsync();
        await Font.loadAsync({
          calibri: require('./assets/fonts/Calibri-Regular.ttf'),
        });

        if (!__DEV__) {
          // Run only on Prod
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            setIsNew(true);
            await Updates.fetchUpdateAsync();
            await Updates.reloadAsync();
          } else {
            setCheckUpdate(false);
          }
        } else {
          setCheckUpdate(false);
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

  if (checkUpdate) {
    let status;
    if (error) {
      status = error;
    } else if (isNew) {
      status = 'Updating...';
    } else {
      status = 'Loading...';
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{status}</Text>
      </View>
    );
  }

  return (
    <ApplicationProvider
      mapping={mapping}
      customMapping={customMapping}
      theme={theme}
    >
      <AppContextProvider>
        <IconRegistry icons={EvaIconsPack} />
        <RootNavigation />
      </AppContextProvider>
    </ApplicationProvider>
  );
}
