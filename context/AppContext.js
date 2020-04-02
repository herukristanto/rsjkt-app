import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect
} from 'react';
import {
  authReducer,
  LOGIN,
  initialState,
  LOGOUT
} from '../reducer/AppReducer';
import { AsyncStorage } from 'react-native';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const getUser = useCallback(async () => {
    const userData = await AsyncStorage.getItem('_USERDATA_');
    if (userData !== null) {
      try {
        dispatch({
          type: LOGIN,
          user: JSON.parse(userData)
        });
        return;
      } catch (e) {
        // ...
      }
    }
    dispatch({ type: LOGOUT });
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
