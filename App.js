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
import { Asset } from 'expo-asset';
import { Notifications } from 'expo';
import { Vibration } from 'react-native';

import { default as appTheme } from './assets/theme.json';
const theme = { ...LightTheme, ...appTheme };

import RootNavigation from './navigations/RootNavigation';
import { AppContextProvider } from './context/AppContext';

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
  const [checkUpdate, setCheckUpdate] = useState(true); // False in dev, True in prod
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState();
  const [notify, setNotify] = useState({});

  // Handle Notification listener
  const handleNotification = (notification) => {
    Vibration.vibrate();
    setNotify(notification);
  };

  const handleResourceAsync = async () => {
    const cacheImages = images.map((img) => {
      return Asset.fromModule(img).downloadAsync();
    });

    return Promise.all(cacheImages);
  };

  useEffect(() => {
    async function checkAndUpdate() {
      try {
        await handleResourceAsync();

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
        checkAndUpdate();

        // Add event listener for push notification
        const notificationSubscription = Notifications.addListener(
          handleNotification
        );
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
