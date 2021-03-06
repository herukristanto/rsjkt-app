import React, { useContext, useState } from 'react';
import { StyleSheet, Alert, AsyncStorage } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import NetInfo from '@react-native-community/netinfo';
import moment from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Notifications } from 'expo';

import { RegisterContext } from '../../context/RegisterContext';
import Divider from '../Divider';
import InputText from '../InputText';
import InputButton from '../InputButton';
import InputSelect from '../InputSelect';
import LoadingOverlay from '../LoadingOverlay';
import { baseAxios } from '../../utils/useAxios';
import { LOGIN } from '../../reducer/AppReducer';
import { AppContext } from '../../context/AppContext';

const RegisterForm4 = (props) => {
  const { setStep, navigation } = props;
  const { state } = useContext(RegisterContext);
  const { dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const handleForm = async (values) => {
    try {
      // Check internet connection
      const connect = await NetInfo.fetch();
      if (!connect.isConnected && !connect.isInternetReachable) {
        Alert.alert('Error', 'No Internet Connection', [{ text: 'Retry' }]);
        return;
      }

      // TODO Send Data User to Server
      const data = {
        ...state.form,
        ...values,
      };

      let namaPekerjaanSutri = '';
      if (data.pekerjaanSutri !== '') {
        namaPekerjaanSutri = state.listPekerjaan.find(
          (pekerjaan) => pekerjaan.value === data.pekerjaanSutri,
        ).label;
      }

      let namaPekerjaanAyah = '';
      if (data.pekerjaanAyah !== '') {
        namaPekerjaanAyah = state.listPekerjaan.find(
          (pekerjaan) => pekerjaan.value === data.pekerjaanAyah,
        ).label;
      }

      let namaAsuransi = '';
      if (data.kodeAsuransi !== '') {
        objectAsuransi = state.listAsuransi.find(
          (asuransi) => data.kodeAsuransi === asuransi.kd_jaminan.trim(),
        );
        namaAsuransi = objectAsuransi.nm_jaminan.trim();
      }

      const request = {
        key: 'rsjkt4231',
        nomor_cm: `R${moment().valueOf()}`,
        Dtg_Awal: moment().format('YYYY-MM-DD'),
        namapasien: data.namaLengkap,
        nmpanggil: data.namaPanggilan,
        tgl_lahir: moment(data.tanggalLahir, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        tmp_lahir: data.tempatLahir,
        gol_darah: data.darah,
        kelamin: data.kelamin,
        agama_id: 5,
        agama_nm: state.listAgama.find((agama) => agama.value == data.agama)
          .label,
        kawin: data.kawin,
        sekolah_id: data.pendidikan,
        sekolah_nm: state.listPendidikan.find(
          (pendidikan) => pendidikan.value === data.pendidikan,
        ).label,
        kd_kerjaan: data.pekerjaan,
        kerjaan_nm: state.listPekerjaan.find(
          (pekerjaan) => pekerjaan.value === data.pekerjaan,
        ).label,
        persh_nm: data.namaPerusahaan,
        noktp: data.noIndentitas,
        jnsktp: data.identitas,
        bangsa: data.kewarganegaraan,
        ayah: data.namaAyah,
        kerjaayah: data.pekerjaanAyah,
        kerja_ayah: namaPekerjaanAyah,
        ibu: data.namaIbu,
        nm_sutri: data.namaSutri,
        kerjasutri: data.pekerjaanSutri,
        kerja_sutri: namaPekerjaanSutri,
        alamat: data.alamat,
        rt: data.rt,
        rw: data.rw,
        hand_phone: data.telp,
        email: data.email,
        kd_member: data.nomorAsuransi,
        kd_jaminan: data.kodeAsuransi,
        nm_jaminan: namaAsuransi,
      };

      const { data: response } = await baseAxios.post('/regnew', request);

      setLoading(false);

      await Notifications.presentLocalNotificationAsync({
        title: 'Pendaftaran Akun Anda Berhasil',
        body: `Nomor Registrasi Sementara Anda adalah : ${response.medical_record}`,
        android: {
          channelId: 'default',
        },
        data: {
          route: 'regis',
          kodeBooking: response.medical_record,
        },
      });

      const userData = {
        nomor_cm: response.medical_record,
        namaPasien: request.namapasien,
        Tgl_lahir: `${request.tgl_lahir} 00:00:00.000`,
        kd_jaminan: request.kd_jaminan,
        kd_anakjmn: '',
        no_kartu: request.kd_member,
        Hand_phone: request.hand_phone,
        role: 'pasien',
      };

      await AsyncStorage.setItem('_USERDATA_', JSON.stringify(userData));
      dispatch({ type: LOGIN, user: userData });

      Alert.alert(
        'Data Berhasil Disimpan',
        `Nomor Registrasi Sementara Anda adalah ${response.medical_record}. Silahkan Gunakan Untuk Login`,
        [{ text: 'OK', onPress: () => navigation.popToTop() }],
      );
    } catch (error) {
      Alert.alert('Error', 'Something Wrong! Please Contact Customer Service!');
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const formSchema = Yup.object().shape({
    pekerjaan: Yup.string().required('Pekerjaan Wajib Diisi'),
  });

  return (
    <Formik
      initialValues={{
        ...state.form,
      }}
      onSubmit={handleForm}
      validationSchema={formSchema}
    >
      <React.Fragment>
        <Text category="h4">Pekerjaan dan Asuransi</Text>
        <Layout style={styles.form}>
          <Text style={styles.label}>Pekerjaan</Text>
          <InputSelect
            placeholder="Pilih Pekerjaan"
            items={state.listPekerjaan}
            name="pekerjaan"
          />
        </Layout>
        <Layout style={styles.form}>
          <InputText
            name="namaPerusahaan"
            label="Nama Perusahaan"
            placeholder="Masukkan Nama Perusahaan"
          />
        </Layout>

        <Divider />
        <Layout style={styles.form}>
          <InputText
            name="nomorAsuransi"
            label="Nomor Asuransi"
            placeholder="Masukkan Nomor Asuransi"
          />
        </Layout>
        <Layout style={styles.form}>
          <InputSelect
            placeholder="Masukkan Asuransi"
            items={state.listAsuransi}
            name="kodeAsuransi"
          />
        </Layout>

        <Layout
          style={[
            styles.form,
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          ]}
        >
          <Button
            onPress={handleBack}
            status="success"
            style={{ width: '40%', marginVertical: 10 }}
          >
            Back
          </Button>
          <InputButton
            label="Simpan"
            status="success"
            style={{ width: '40%', marginVertical: 10 }}
          />
        </Layout>
        {loading && <LoadingOverlay />}
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

export default RegisterForm4;
