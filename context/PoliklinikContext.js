import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import moment from 'moment';

import {
  PoliklinikReducer,
  GET_DAFTAR_PRAKTER,
  SET_USER_TO_FORM,
} from '../reducer/PoliklinikReducer';
import { initialState } from '../reducer/PoliklinikReducer';
import useAxios from '../utils/useAxios';
import { getUnique } from '../utils/helpers';
import { AppContext } from './AppContext';

export const PoliklinikContext = createContext();

export const PoliklinikContextProvider = ({ children }) => {
  const { state: stateApp } = useContext(AppContext);
  const [state, dispatch] = useReducer(PoliklinikReducer, initialState);

  const [, getDaftar] = useAxios(
    { url: '/daftar_praktek', method: 'GET' },
    { manual: true }
  );
  const [, getPenjamin] = useAxios(
    { url: '/penjaminAll', method: 'GET' },
    { manual: true }
  );

  const getPoli = useCallback(async () => {
    try {
      const { data: dataPenjamin } = await getPenjamin({
        params: { key: 'rsjkt4231' },
      });
      const penjaminUnique = await getUnique(dataPenjamin, 'Nm_jaminan');
      const penjaminData = await penjaminUnique.map((penjamin) => {
        return {
          value: penjamin.Nm_jaminan.trim(),
          label: penjamin.Nm_jaminan.trim(),
        };
      });

      const { data } = await getDaftar({ params: { key: 'rsjkt4231' } });
      // console.log('request');

      const poliUnique = await getUnique(data, 'Poli_nm');
      const poliData = await poliUnique.map((poli) => {
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
      });
      dispatch({
        type: SET_USER_TO_FORM,
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
  }, []);

  useEffect(() => {
    getPoli();
    return () => {};
  }, [getPoli]);

  return (
    <PoliklinikContext.Provider value={{ state, dispatch }}>
      {children}
    </PoliklinikContext.Provider>
  );
};
