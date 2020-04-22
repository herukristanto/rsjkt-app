import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect,
} from 'react';
import {
  authReducer,
  LOGIN,
  initialState,
  LOGOUT,
  INIT,
} from '../reducer/AppReducer';
import { AsyncStorage, Alert } from 'react-native';

import { baseAxios } from '../utils/useAxios';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const getUser = useCallback(async () => {
    try {
      const userData = await AsyncStorage.getItem('_USERDATA_');
      const { data } = await baseAxios.get('/get', {
        params: {
          p: 'runtext',
        },
      });
      const { data: dataSlider } = await baseAxios.get('/get', {
        params: {
          p: 'slider',
        },
      });
      if (userData !== null) {
        dispatch({
          type: LOGIN,
          user: JSON.parse(userData),
        });
        return;
      }
      dispatch({ type: INIT, scrollText: data[0].runtext, slider: dataSlider });
      dispatch({ type: LOGOUT });
    } catch (e) {
      Alert.alert('Error', 'Something Wrong! Please Contact Customer Service!');
    }
  }, []);

  useEffect(() => {
    getUser();
    return () => {};
  }, [getUser]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
