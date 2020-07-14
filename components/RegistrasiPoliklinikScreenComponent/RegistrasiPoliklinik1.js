import React, { useContext, useEffect } from 'react';
import { StyleSheet, Alert, BackHandler } from 'react-native';
import { Text, Layout, Spinner } from '@ui-kitten/components';
import { Formik } from 'formik';
import moment from 'moment';

import { PoliklinikContext } from '../../context/PoliklinikContext';
import {
  GET_DAFTAR_DOKTER,
  ADD_TO_FORM,
  GET_DAFTAR_PERUSAHAAN,
} from '../../reducer/PoliklinikReducer';
import InputText from '../InputText';
import InputSelect from '../InputSelect';
import InputRadio from '../InputRadio';
import InputButton from '../InputButton';
import { baseAxios } from '../../utils/useAxios';
import InputDokter from './InputDokter';
import SelectJadwal from './SelectJadwal';
import SelectJaminan from './SelectJaminan';

const RegistrasiPoliklinik1 = ({ setStep }) => {
  const { state, dispatch } = useContext(PoliklinikContext);
  const { isLoading: stateLoading } = state;

  useEffect(() => {
    const backAction = () => {
      if (stateLoading) {
        return true;
      } else {
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [stateLoading]);

  const handlePoliklinik = (value) => {
    const rawDokter = state.daftarPraktek.map((item) => {
      if (item.Poli_ID === value) {
        return {
          ...item,
          value: item.Dokter_ID,
          label: item.Dokter_nm.trim(),
        };
      }
    });

    const filteredDokter = rawDokter.filter(Boolean);
    dispatch({
      type: GET_DAFTAR_DOKTER,
      daftarDokter: filteredDokter,
    });
  };

  const handlePenjamin = async (value) => {
    let dataPerusahaan;
    try {
      const { data } = await baseAxios.get('/anakpenjamin', {
        params: {
          kd_jaminan: value,
        },
      });

      dataPerusahaan = data.map((perusahaan) => {
        return {
          value: perusahaan.kd_anakjmn.trim(),
          label: perusahaan.NM_AnakJMN.trim(),
        };
      });
    } catch (error) {
      dataPerusahaan = [];
    }

    const jaminan = state.daftarPenjamin.find(
      (jaminan) => jaminan.value === value
    );

    if (jaminan.label.includes('BPJS')) {
      const filteredDokter = state.daftarDokter.filter(
        (dokter) => dokter.flag_bpjs === 1
      );

      dispatch({
        type: GET_DAFTAR_DOKTER,
        daftarDokter: filteredDokter,
      });
    }

    dispatch({
      type: GET_DAFTAR_PERUSAHAAN,
      daftarPerusahaan: dataPerusahaan,
      namaJaminan: jaminan.label,
    });
  };

  const handleForm = async (values) => {
    let namaPerusahaan = '';
    if (values.status === 1) {
      if (values.perusahaan !== '') {
        const perusahaan = state.daftarPerusahaan.find(
          (perusahaan) => values.perusahaan == perusahaan.value
        );
        namaPerusahaan = perusahaan.label;
      }
    }

    const sisaKuota = values.tanggal.kuota;
    if (sisaKuota === 0) {
      Alert.alert('Peringatan', 'Untuk Jadwal Tersebut Kuota Sudah Penuh');
      return;
    }

    dispatch({
      type: ADD_TO_FORM,
      data: {
        ...values,
        _label_perusahaan: namaPerusahaan,
        noRekamMedis: state.form.noRekamMedis,
        tanggalLahir: state.form.tanggalLahir,
      },
    });
    setStep((prevStep) => prevStep + 1);
  };

  const onValidate = (values) => {
    const errors = {};

    if (!values.poliklinik) {
      errors.poliklinik = 'Poliklinik Tidak Boleh Kosong';
    }
    if (!values.dokter) {
      errors.dokter = 'Dokter Tidak Boleh Kosong';
    }
    if (!values.tanggal) {
      errors.tanggal = 'Tanggal Tidak Boleh Kosong';
    }
    if (values.status === 1) {
      if (!values.jaminan) {
        errors.jaminan = 'Jaminan Tidak Boleh Kosong';
      }
      // if (!values.perusahaan) {
      //   errors.perusahaan = 'Perusahaan Tidak Boleh Kosong';
      // }
      if (!values.noKartu) {
        errors.noKartu = 'No Kartu Tidak Boleh Kosong';
      }
    }

    return errors;
  };

  const RenderJaminan = () => {
    return (
      <>
        <Layout style={styles.form}>
          <Text style={styles.label}>Jaminan</Text>
          <SelectJaminan
            items={state.daftarPenjamin}
            placeholder='Pilih/Cari Jaminan'
            name='jaminan'
            handlePenjamin={handlePenjamin}
          />
        </Layout>
        <Layout style={styles.form}>
          <Text style={styles.label}>Perusahaan</Text>
          <InputSelect
            placeholder='Pilih Perusahaan'
            items={state.daftarPerusahaan}
            name='perusahaan'
          />
        </Layout>
        <Layout style={styles.form}>
          <InputText name='noKartu' label='No Kartu' />
        </Layout>
      </>
    );
  };

  if (state.isLoading) {
    return <Spinner status='success' />;
  }

  return (
    <Formik
      initialValues={{
        dokter: state.form.dokter,
        _label_dokter: state.form._label_dokter,
        poliklinik: state.form.poliklinik,
        tanggal: state.form.tanggal,
        _label_tanggal: state.form._label_tanggal,
        status: state.form.status,
        jaminan: state.form.jaminan,
        _label_jaminan: state.form._label_jaminan,
        perusahaan: state.form.perusahaan,
        _label_perusahaan: state.form._label_perusahaan,
        noKartu: state.form.noKartu,
        cluster: {},
      }}
      onSubmit={handleForm}
      validate={onValidate}
    >
      {(props) => (
        <React.Fragment>
          <Layout style={styles.form}>
            <InputText
              name='noRekamMedis'
              label='No Rekam Medis'
              disabled
              placeholder={state.form.noRekamMedis}
              placeholderTextColor='black'
              style={{ backgroundColor: '#FEFDCB' }}
            />
          </Layout>
          <Layout style={styles.form}>
            <InputText
              name='tanggalLahir'
              label='Tanggal Lahir'
              placeholder={moment(state.form.tanggalLahir).format(
                'DD MMMM YYYY'
              )}
              placeholderTextColor='black'
              disabled
              style={{ backgroundColor: '#FEFDCB' }}
            />
          </Layout>
          <Layout style={styles.form}>
            <Text style={styles.label}>Poliklinik</Text>
            <InputSelect
              placeholder='Pilih Poliklinik'
              items={state.daftarPoli}
              name='poliklinik'
              additionalHandler={handlePoliklinik}
            />
          </Layout>

          <Layout style={styles.form}>
            <InputRadio
              name='status'
              items={['Pribadi', 'Penjamin']}
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}
              disabledRadio={state.daftarDokter.length > 0 ? false : true}
            />
          </Layout>
          {props.values.status == 1 && <RenderJaminan />}

          <Layout style={styles.form}>
            <Text style={styles.label}>Dokter</Text>
            <InputDokter name='dokter' items={state.daftarDokter} />
          </Layout>
          <Layout style={styles.form}>
            <Text style={styles.label}>Tanggal Kunjungan</Text>
            <SelectJadwal
              items={state.daftarJadwal}
              placeholder='Pilih Jadwal Kunjungan'
              name='tanggal'
              disabled={state.daftarJadwal.length ? false : true}
            />
          </Layout>

          <Layout style={[styles.form, { flexDirection: 'row-reverse' }]}>
            <InputButton
              label='Next'
              status='success'
              style={{ width: '45%' }}
            />
          </Layout>
        </React.Fragment>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '90%',
    marginVertical: 2,
  },
  label: {
    color: '#778899',
    fontSize: 12,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegistrasiPoliklinik1;
