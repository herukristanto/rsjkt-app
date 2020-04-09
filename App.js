import React, { useState, useEffect } from 'react';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
  Button,
} from '@ui-kitten/components';
import { mapping, light as LightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Updates from 'expo-updates';
import axios from 'axios';

import { default as appTheme } from './assets/theme.json';
const theme = { ...LightTheme, ...appTheme };

import RootNavigation from './navigations/RootNavigation';
import { AppContextProvider } from './context/AppContext';
import { Alert } from 'react-native';

const images = [
  require('./assets/images/login-image.png'),
  require('./assets/images/rs1.jpg'),
  require('./assets/images/rs2.png'),
  require('./assets/images/rs3.jpg'),

  require('./assets/icon/cek-booking.png'),
  require('./assets/icon/login-dokter.png'),
  require('./assets/icon/login-pasien.png'),
  require('./assets/icon/lokasi.png'),
  require('./assets/icon/registrasi-akun.png'),
  require('./assets/icon/registrasi-poli.png'),
  require('./assets/icon/logout.png'),
];

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleResourceAsync = async () => {
    const cacheImages = images.map((img) => {
      return Asset.fromModule(img).downloadAsync();
    });

    return Promise.all(cacheImages);
  };

  const doUpdate = async () => {
    await Updates.fetchUpdateAsync();
    await Updates.reloadAsync();
  };

  useEffect(() => {
    async function checkUpdate() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await axios.get('https://granitebps.com/react-native', {
            params: {
              status: 'Ada Update',
            },
          });
          Alert.alert(
            'Pemberitahuan',
            'Ada Update',
            [
              {
                text: 'Update Sekarang',
                onPress: doUpdate,
              },
              {
                text: 'Update Nanti',
              },
            ],
            {
              cancelable: false,
            }
          );
        } else {
          await axios.get('https://granitebps.com/react-native', {
            params: {
              status: 'Tidak ada Update',
            },
          });
        }
      } catch (error) {
        Alert.alert(
          'Error',
          JSON.stringify(error, null, 2),
          [{ text: 'Okay' }],
          { cancelable: false }
        );
      }
    }
    checkUpdate();
  }, []);

  if (!isLoading) {
    return (
      <AppLoading
        startAsync={handleResourceAsync}
        onError={(error) => console.log(error)}
        onFinish={() => setIsLoading(true)}
      />
    );
  }

  return (
    <ApplicationProvider mapping={mapping} theme={theme}>
      <AppContextProvider>
        <IconRegistry icons={EvaIconsPack} />
        <RootNavigation />
      </AppContextProvider>
    </ApplicationProvider>
  );
}
