import React, { createContext, useReducer, useEffect, useContext } from 'react';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  PoliklinikReducer,
  GET_DAFTAR_PRAKTER,
} from '../reducer/PoliklinikReducer';
import { initialState } from '../reducer/PoliklinikReducer';
import { baseAxios } from '../utils/useAxios';
import { getUnique, getJadwalFromDokter } from '../utils/helpers';
import { AppContext } from './AppContext';

export const PoliklinikContext = createContext();

export const PoliklinikContextProvider = ({ children }) => {
  const { state: stateApp } = useContext(AppContext);
  const [state, dispatch] = useReducer(PoliklinikReducer, initialState);
  const navigation = useNavigation();
  const route = useRoute();

  const getPoli = async () => {
    try {
      // Check internet connection
      const connect = await NetInfo.fetch();
      if (!connect.isConnected && !connect.isInternetReachable) {
        Alert.alert('Error', 'No Internet Connection', [
          { text: 'OK', onPress: () => navigation.popToTop() },
        ]);
      }

      const { data: dataPenjamin } = await baseAxios.get('/penjamin');
      const penjaminData = dataPenjamin.map((penjamin) => {
        return {
          value: penjamin.kd_jaminan.trim(),
          label: penjamin.nm_jaminan.trim(),
        };
      });

      let anakPenjaminData = [];
      let namaAnakPenjamin = '';
      let namaPenjamin = '';
      if (stateApp.user.kd_jaminan.trim() !== '') {
        const { data: dataAnakPenjamin } = await baseAxios.get(
          '/anakpenjamin',
          {
            params: {
              kd_jaminan: stateApp.user.kd_jaminan.trim(),
            },
          }
        );
        anakPenjaminData = dataAnakPenjamin.map((anakPenjamin) => {
          return {
            value: anakPenjamin.kd_anakjmn.trim(),
            label: anakPenjamin.NM_AnakJMN.trim(),
          };
        });
        namaAnakPenjamin = dataAnakPenjamin.find(
          (anakPenjamin) =>
            anakPenjamin.kd_anakjmn === stateApp.user.kd_anakjmn.trim()
        );
        namaPenjamin = penjaminData.find(
          (jaminan) => jaminan.value === stateApp.user.kd_jaminan.trim()
        );
      }

      const { data: dataPraktek } = await baseAxios.get('/daftar_praktek', {
        params: {
          key: 'rsjkt4231',
        },
      });
      const { data } = await baseAxios.get('/get', {
        params: {
          p: 'poli',
        },
      });

      // const poliUnique = getUnique(data, 'Poli_ID');
      const poliData = data.map((poli) => {
        return {
          value: poli.poli_id,
          label: poli.poli_nm.trim(),
        };
      });

      // Data Dokter from JadwalDokter Screen
      let daftarJadwal = [];
      let daftarDokter = [];
      let poliklinik = '';
      let dokter = '';
      let _label_dokter = '';
      if (route.params) {
        const dataDokter = route.params.dataDokter;
        const rawDokter = dataPraktek.map((item) => {
          if (item.Poli_ID === parseInt(dataDokter.Poli_ID)) {
            return {
              ...item,
              value: item.Dokter_ID,
              label: item.Dokter_nm.trim(),
            };
          }
        });

        const filteredDokter = rawDokter.filter(Boolean);
        daftarDokter = filteredDokter;
        daftarJadwal = getJadwalFromDokter(
          filteredDokter,
          parseInt(dataDokter.Dokter_ID)
        );
        poliklinik = parseInt(dataDokter.Poli_ID);
        dokter = parseInt(dataDokter.Dokter_ID);
        _label_dokter = dataDokter.Dokter_nm.trim();
      }

      dispatch({
        type: GET_DAFTAR_PRAKTER,
        daftarPraktek: dataPraktek,
        daftarPoli: poliData,
        daftarPenjamin: penjaminData,
        daftarPerusahaan: anakPenjaminData,
        daftarDokter: daftarDokter,
        daftarJadwal: daftarJadwal,
        user: {
          namaPasien: stateApp.user.namaPasien,
          noRekamMedis: `${stateApp.user.nomor_cm}`,
          tanggalLahir: moment(stateApp.user.Tgl_lahir),
          noKartu: stateApp.user.no_kartu.trim(),
          jaminan: stateApp.user.kd_jaminan.trim(),
          perusahaan: stateApp.user.kd_anakjmn.trim(),
          _label_jaminan: namaPenjamin.label,
          _label_perusahaan: namaAnakPenjamin
            ? namaAnakPenjamin.NM_AnakJMN
            : '',
          telp: stateApp.user.Hand_phone.trim(),
          poliklinik: poliklinik,
          dokter: dokter,
          _label_dokter: _label_dokter,
        },
      });
      return;
    } catch (error) {
      Alert.alert(
        'Error',
        'Something Wrong! Please Contact Customer Service!',
        [{ text: 'OK', onPress: () => navigation.popToTop() }]
      );
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
