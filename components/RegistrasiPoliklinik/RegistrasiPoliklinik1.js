import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Layout, Spinner } from '@ui-kitten/components';
import { Formik } from 'formik';

import { getUnique } from '../../utils/helpers';
import InputText from '../InputText';
import InputSelect from '../InputSelect';
import InputRadio from '../InputRadio';
import { PoliklinikContext } from '../../context/PoliklinikContext';
import {
  GET_DAFTAR_DOKTER,
  ADD_TO_FORM,
  GET_DAFTAR_PERUSAHAAN,
} from '../../reducer/PoliklinikReducer';
import InputButton from '../InputButton';
import InputDokter from '../InputDokter';

const RegistrasiPoliklinik1 = ({ setStep }) => {
  const { state, dispatch } = useContext(PoliklinikContext);

  const handlePoliklinik = async (value) => {
    const rawDokter = state.daftarPraktek.map((item) => {
      if (item.Poli_nm.trim() == value) {
        return {
          value: item.Dokter_nm.trim(),
          label: item.Dokter_nm.trim(),
        };
      }
    });
    const dokterUnique = await getUnique(rawDokter, 'label');

    dispatch({
      type: GET_DAFTAR_DOKTER,
      daftarDokter: dokterUnique,
    });
  };

  const handlePenjamin = async (value) => {
    const rawPerusahaan = state.daftarPenjamin.map((item) => {
      if (item.Nm_jaminan.trim() == value) {
        return {
          label: item.NM_AnakJMN.trim(),
          value: item.NM_AnakJMN.trim(),
        };
      }
      return;
    });
    const filteredPerusahaan = rawPerusahaan.filter(Boolean);
    dispatch({
      type: GET_DAFTAR_PERUSAHAAN,
      daftarPerusahaan: filteredPerusahaan,
    });
  };

  const handleForm = (values) => {
    dispatch({
      type: ADD_TO_FORM,
      data: {
        ...values,
        noRekamMedis: state.form.noRekamMedis,
        tanggalLahir: state.form.tanggalLahir,
      },
    });
    setStep((prevStep) => prevStep + 1);
  };

  const RenderJaminan = () => {
    return (
      <>
        <Layout style={styles.form}>
          <Text style={styles.label}>Jaminan</Text>
          <InputSelect
            placeholder='Pilih Jaminan'
            items={state.daftarJaminan}
            name='jaminan'
            additionalHandler={handlePenjamin}
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
          <InputText name='noKartu' label='No Kartu' disabled />
        </Layout>
      </>
    );
  };

  if (state.isLoading) {
    return <Spinner />;
  }

  return (
    <Formik
      initialValues={{
        noKartu: state.form.noKartu,
        dokter: state.form.dokter,
        poliklinik: state.form.poliklinik,
        tanggal: state.form.tanggal,
        status: state.form.status,
        jaminan: state.form.jaminan,
        perusahaan: state.form.perusahaan,
      }}
      onSubmit={handleForm}
      enableReinitialize
    >
      {(props) => (
        <React.Fragment>
          <Text category='h4'>Registrasi Poliklinik</Text>
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
              placeholder={state.form.tanggalLahir}
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
            <Text style={styles.label}>Dokter</Text>
            <InputDokter name='dokter' items={state.daftarDokter} />
          </Layout>
          <Layout style={styles.form}>
            <Text style={styles.label}>Tanggal Kunjungan</Text>
            <InputSelect
              disabled={state.daftarJadwal.length > 0 ? false : true}
              placeholder='Pilih Tanggal Kunjungan'
              items={state.daftarJadwal}
              name='tanggal'
            />
          </Layout>
          <Layout style={styles.form}>
            <InputRadio
              name='status'
              items={['Pribadi', 'Penjamin']}
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}
            />
          </Layout>

          {props.values.status == 1 && <RenderJaminan />}

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
