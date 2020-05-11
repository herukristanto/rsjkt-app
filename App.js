import React, { useState } from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { mapping, light as LightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Image } from 'react-native';
import { AppLoading } from 'expo';

import { default as appTheme } from './assets/theme.json';
const theme = { ...LightTheme, ...appTheme };

import RootNavigation from './navigations/RootNavigation';
import { AppContextProvider } from './context/AppContext';

const images = [
  require('./assets/images/login-image.png'),

  require('./assets/icon/cek-pendaftaran.png'),
  require('./assets/icon/lokasi.png'),
  require('./assets/icon/registrasi.png'),
  require('./assets/icon/login.png'),
  require('./assets/icon/status.png'),
  require('./assets/icon/alamat.png'),
  require('./assets/icon/informasi.png'),
];

const strictTheme = { ['text-font-family']: 'calibri' };
const customMapping = { strict: strictTheme };

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const loadAssetsAsync = async () => {
    const imageAssets = cacheImages(images);
    const fontAssets = cacheFonts([
      {
        calibri: require('./assets/fonts/Calibri-Regular.ttf'),
      },
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
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
