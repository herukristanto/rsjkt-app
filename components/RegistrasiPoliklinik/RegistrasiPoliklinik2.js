import React, { useContext } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Text, Layout, Button } from '@ui-kitten/components';
import NetInfo from '@react-native-community/netinfo';
import moment from 'moment';
import { Formik } from 'formik';
import cuid from 'cuid';

import { PoliklinikContext } from '../../context/PoliklinikContext';
import { ADD_TO_FORM } from '../../reducer/PoliklinikReducer';
import InputText from '../InputText';
import InputButton from '../InputButton';
import { baseAxios } from '../../utils/useAxios';

const RegistrasiPoliklinik2 = ({ setStep }) => {
  const { state, dispatch } = useContext(PoliklinikContext);

  const handleForm = async (values) => {
    try {
      // Check internet connection
      const connect = await NetInfo.fetch();
      if (!connect.isConnected && !connect.isInternetReachable) {
        Alert.alert('Error', 'No Internet Connection', [{ text: 'OK' }]);
        return;
      }

      dispatch({
        type: ADD_TO_FORM,
        data: {
          ...values,
        },
      });

      const uid = cuid();
      const request = {
        no_reg: uid,
        tgl_reg: moment().format('DD/MM/YYYY'),
        nomor_cm: state.form.noRekamMedis,
        poli_id: state.form.poliklinik,
        poli_nm: state.daftarJadwal[0].poli,
        dokter_id: state.form.dokter,
        dokter_nm: state.form._label_dokter,
        tgl_pesan: state.form.tanggal.tanggal,
        jam: `${state.form.tanggal.jamAwal} - ${state.form.tanggal.jamAkhir}`,
        jenis_penjamin: state.form.status === 0 ? 'Pribadi' : 'Jaminan',
        kd_jaminan: state.form.jaminan,
        kd_anakjaminan: state.form.perusahaan,
        hand_phone: values.telp,
      };

      // TODO Do Something with response data
      // const { data } = await baseAxios.post('/regpoli', request);

      Alert.alert('Berhasil', 'Pendaftaran Berhasil Dilakukan', [
        { text: 'OK', onPress: () => setStep((prevStep) => prevStep + 1) },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Something Wrong! Please Contact Customer Service!');
    }
  };

  const onValidate = (values) => {
    const errors = {};

    if (!values.telp) {
      errors.telp = 'Telp Tidak Boleh Kosong';
    }

    return errors;
  };

  const RenderPribadi = () => {
    return (
      <Layout style={styles.form}>
        <Text>Jaminan : Pribadi</Text>
      </Layout>
    );
  };

  const RenderPenjamin = () => {
    return (
      <React.Fragment>
        <Layout style={styles.form}>
          <Text>Jaminan : {state.form.jaminan}</Text>
        </Layout>
        <Layout style={styles.form}>
          <Text>Perusahaan : {state.form.perusahaan}</Text>
        </Layout>
        <Layout style={styles.form}>
          <Text>No Jaminan : {state.form.noKartu}</Text>
        </Layout>
      </React.Fragment>
    );
  };

  return (
    <Formik
      initialValues={{
        telp: '',
      }}
      onSubmit={handleForm}
      validate={onValidate}
    >
      <React.Fragment>
        <Text>Registrasi Poliklinik</Text>
        <Layout style={styles.form}>
          <Text>Medical Record : {state.form.noRekamMedis}</Text>
        </Layout>
        <Layout style={styles.form}>
          <Text>Tanggal Lahir : {state.form.tanggalLahir}</Text>
        </Layout>
        <Layout style={styles.form}>
          <Text>Dokter : {state.form._label_dokter}</Text>
        </Layout>
        <Layout style={styles.form}>
          <Text>Poliklinik : {state.daftarJadwal[0].poli}</Text>
        </Layout>
        {state.form.status === 0 ? <RenderPribadi /> : <RenderPenjamin />}
        <Layout style={styles.form}>
          <InputText
            name='telp'
            label='Masukkan Telp'
            keyboardType='number-pad'
            placeholder='08*******'
          />
        </Layout>
        <Layout
          style={[
            styles.form,
            { flexDirection: 'row', justifyContent: 'space-between' },
          ]}
        >
          <Button
            status='success'
            onPress={() => setStep((prevStep) => prevStep - 1)}
            style={{ width: '45%' }}
          >
            Back
          </Button>
          <InputButton label='Save' status='success' style={{ width: '45%' }} />
        </Layout>
      </React.Fragment>
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
});

export default RegistrasiPoliklinik2;
