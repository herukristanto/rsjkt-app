import React, { createContext, useReducer, useEffect, useContext } from 'react';
import moment from 'moment';

import {
  PoliklinikReducer,
  GET_DAFTAR_PRAKTER,
} from '../reducer/PoliklinikReducer';
import { initialState } from '../reducer/PoliklinikReducer';
import { baseAxios } from '../utils/useAxios';
import { getUnique } from '../utils/helpers';
import { AppContext } from './AppContext';

export const PoliklinikContext = createContext();

export const PoliklinikContextProvider = ({ children }) => {
  const { state: stateApp } = useContext(AppContext);
  const [state, dispatch] = useReducer(PoliklinikReducer, initialState);

  const getPoli = async () => {
    try {
      const { data: dataPenjamin } = await baseAxios.get('/penjaminAll', {
        params: {
          key: 'rsjkt4231',
        },
      });
      const penjaminUnique = getUnique(dataPenjamin, 'Nm_jaminan');
      const penjaminData = penjaminUnique.map((penjamin) => {
        return {
          value: penjamin.Nm_jaminan.trim(),
          label: penjamin.Nm_jaminan.trim(),
        };
      });

      const { data } = await baseAxios.get('/daftar_praktek', {
        params: {
          key: 'rsjkt4231',
        },
      });

      const poliUnique = getUnique(data, 'Poli_nm');
      const poliData = poliUnique.map((poli) => {
        return {
          value: poli.Poli_nm.trim(),
          label: poli.Poli_nm.trim(),
        };
      });

      dispatch({
        type: GET_DAFTAR_PRAKTER,
        daftarPraktek: data,
        daftarPoli: poliData,
        daftarPenjamin: dataPenjamin,
        daftarJaminan: penjaminData,
        user: {
          noRekamMedis: `${stateApp.user.nomor_cm}`,
          tanggalLahir: moment(stateApp.user.Tgl_lahir).format('DD MMMM YYYY'),
          noKartu: stateApp.user.nm_jaminan.trim(),
        },
      });
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPoli();
  }, []);

  return (
    <PoliklinikContext.Provider value={{ state, dispatch }}>
      {children}
    </PoliklinikContext.Provider>
  );
};
