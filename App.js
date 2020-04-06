import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { mapping, light as LightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';

import { default as appTheme } from './assets/theme.json';
const theme = { ...LightTheme, ...appTheme };

import RootNavigation from './navigations/RootNavigation';
import { AppContextProvider } from './context/AppContext';

const images = [
  require('./assets/images/login-image.png'),
  require('./assets/images/rs1.jpg'),
  require('./assets/images/rs2.jpg'),
  require('./assets/images/rs3.jpg'),
];

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleResourceAsync = async () => {
    const cacheImages = images.map((img) => {
      return Asset.fromModule(img).downloadAsync();
    });

    return Promise.all(cacheImages);
  };

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
