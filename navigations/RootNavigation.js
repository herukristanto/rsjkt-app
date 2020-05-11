import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppContext } from '../context/AppContext';
import StartupScreen from '../screens/StartupScreen';

import HomeNavigation from './HomeNavigation';
import DokterNavigation from './DokterNavigation';

const RootNavigation = () => {
  const { state } = useContext(AppContext);

  if (state.loading) {
    return <StartupScreen />;
  } else {
    if (state.isLogin && state.user.role === 'dokter') {
      return (
        <NavigationContainer>
          <DokterNavigation />
        </NavigationContainer>
      );
    }

    return (
      <NavigationContainer>
        <HomeNavigation />
      </NavigationContainer>
    );
  }
};

export default RootNavigation;
