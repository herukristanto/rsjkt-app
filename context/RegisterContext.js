import React, { createContext, useReducer, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

import {
  RegisterReducer,
  initialState,
  GET_MASTER,
} from '../reducer/RegisterReducer';
import { baseAxios } from '../utils/useAxios';

export const RegisterContext = createContext();

export const RegisterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RegisterReducer, initialState);

  useEffect(() => {
    const getMaster = async () => {
      try {
        // Check internet connection
        const connect = await NetInfo.fetch();
        if (!connect.isConnected && !connect.isInternetReachable) {
          Alert.alert('Error', 'No Internet Connection', [
            { text: 'OK', onPress: () => navigation.popToTop() },
          ]);
        }

        // Get Master Agama
        const { data: dataAgama } = await baseAxios.get('/get', {
          params: {
            p: 'ag',
          },
        });
        const listAgama = dataAgama.map((agama) => {
          return {
            label: agama.AGAMA_NM.trim(),
            value: agama.AGAMA_ID,
          };
        });

        // Get Master Pekerjaan
        const { data: dataPekerjaan } = await baseAxios.get('/get', {
          params: {
            p: 'pk',
          },
        });
        const listPekerjaan = dataPekerjaan.map((pekerjaan) => {
          return {
            label: pekerjaan.Kerjaan_Nm.trim(),
            value: pekerjaan.KD_Kerjaan.trim(),
          };
        });

        // Get Master Pendidikan
        const { data: dataPendidikan } = await baseAxios.get('/get', {
          params: {
            p: 'pd',
          },
        });
        const listPendidikan = dataPendidikan.map((pendidikan) => {
          return {
            label: pendidikan.SEKOLAH_NM,
            value: pendidikan.SEKOLAH_ID,
          };
        });

        dispatch({
          type: GET_MASTER,
          listAgama: listAgama,
          listPekerjaan: listPekerjaan,
          listPendidikan: listPendidikan,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getMaster();
  }, []);

  return (
    <RegisterContext.Provider value={{ state, dispatch }}>
      {children}
    </RegisterContext.Provider>
  );
};
