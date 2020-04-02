import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { mapping, light as LightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { default as appTheme } from './assets/theme.json';
const theme = { ...LightTheme, ...appTheme };

import RootNavigation from './navigations/RootNavigation';
import { AppContextProvider } from './context/AppContext';

export default function App() {
  return (
    <ApplicationProvider mapping={mapping} theme={theme}>
      <AppContextProvider>
        <IconRegistry icons={EvaIconsPack} />
        <RootNavigation />
      </AppContextProvider>
    </ApplicationProvider>
  );
}
