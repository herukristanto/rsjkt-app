import React, { createContext, useReducer } from 'react';
import { RegisterReducer, initialState } from '../reducer/RegisterReducer';

export const RegisterContext = createContext();

export const RegisterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RegisterReducer, initialState);

  return (
    <RegisterContext.Provider value={{ state, dispatch }}>
      {children}
    </RegisterContext.Provider>
  );
};
