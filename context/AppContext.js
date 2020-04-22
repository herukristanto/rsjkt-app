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
} from '../reducer/AppReducer';
import { AsyncStorage, Alert } from 'react-native';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const getUser = useCallback(async () => {
    try {
      const userData = await AsyncStorage.getItem('_USERDATA_');
      if (userData !== null) {
        dispatch({
          type: LOGIN,
          user: JSON.parse(userData),
        });
        return;
      }
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
