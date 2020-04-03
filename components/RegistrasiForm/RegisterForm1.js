import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
  Input,
  RadioGroup,
  Radio,
  Button
} from '@ui-kitten/components';
import { Formik } from 'formik';

import InputSelect from '../InputSelect';
import CustomDatePicker from '../CustomDatePicker';
import { RegisterContext } from '../../context/RegisterContext';
import { ADD_FORM } from '../../reducer/RegisterReducer';

const RegisterForm1 = props => {
  const { state, dispatch } = useContext(RegisterContext);
  const { setStep } = props;
  // console.log(state.form);

  const [namaLengkap, setNamaLengkap] = useState(state.form.namaLengkap);
  const [namaPanggilan, setNamaPanggilan] = useState(state.form.namaPanggilan);
  const [identitas, setIdentitas] = useState(state.form.identitas);
  const [noIndentitas, setNoIndentitas] = useState(state.form.noIndentitas);
  const [tanggalLahir, setTanggalLahir] = useState(state.form.tanggalLahir);
  const [kelamin, setKelamin] = useState(state.form.kelamin);
  const [darah, setDarah] = useState(state.form.darah);
  const [pendidikan, setPendidikan] = useState(state.form.pendidikan);
  const [agama, setAgama] = useState(state.form.agama);

  const handleForm = () => {
    dispatch({
      type: ADD_FORM,
      form: {
        namaLengkap,
        namaPanggilan,
        identitas,
        noIndentitas,
        tanggalLahir,
        kelamin,
        darah,
        pendidikan,
        agama
      }
    });
    setStep(prevStep => prevStep + 1);
  };

  return (
    <React.Fragment>
      <Text category='h4'>Data Pasien</Text>
      <Layout style={styles.form}>
        <Input
          autoCapitalize='words'
          label='Nama Lengkap'
          placeholder='Masukkan Nama Lengkap'
          value={namaLengkap}
          onChangeText={text => setNamaLengkap(text)}
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Nama Panggilan'
          placeholder='Masukkan Nama Panggilan'
          value={namaPanggilan}
          onChangeText={text => setNamaPanggilan(text)}
        />
      </Layout>
      <Layout style={styles.form}>
        <Text style={styles.label}>Identitas</Text>
        <InputSelect
          placeholder='Pilih Identitas'
          data={[
            { label: 'KTP', value: 'ktp' },
            { label: 'SIM', value: 'sim' }
          ]}
          value={identitas}
          onChange={value => setIdentitas(value)}
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Nomor Identitas'
          placeholder='Masukkan Nomor Identitas'
          value={noIndentitas}
          onChangeText={text => setNoIndentitas(text)}
          keyboardType='number-pad'
        />
      </Layout>
      <Layout style={styles.form}>
        <Text style={styles.label}>Tanggal Lahir</Text>
        <CustomDatePicker value={tanggalLahir} setValue={setTanggalLahir} />
      </Layout>
      <Layout style={styles.form}>
        <Text style={styles.label}>Jenis Kelamin</Text>
        <RadioGroup
          selectedIndex={kelamin}
          onChange={index => setKelamin(index)}
        >
          <Radio text='Laki - Laki' />
          <Radio text='Perempuan' />
        </RadioGroup>
      </Layout>
      <Layout style={styles.form}>
        <Text style={styles.label}>Golongan Darah</Text>
        <InputSelect
          placeholder='Pilih Golongan Darah'
          data={[
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'AB', value: 'ab' },
            { label: 'O', value: 'o' }
          ]}
          value={darah}
          onChange={value => setDarah(value)}
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Pendidikan'
          placeholder='Masukkan Pendidikan'
          value={pendidikan}
          onChangeText={text => setPendidikan(text)}
        />
      </Layout>
      <Layout style={styles.form}>
        <Text style={styles.label}>Agama</Text>
        <InputSelect
          placeholder='Pilih Agama'
          data={[
            { label: 'Islam', value: 'islam' },
            { label: 'Kristen', value: 'kristen' },
            { label: 'Katolik', value: 'katolik' },
            { label: 'Hindu', value: 'hindu' },
            { label: 'Budha', value: 'budha' },
            { label: 'Khong Hu Cu', value: 'khong_hu_cu' }
          ]}
          value={agama}
          onChange={value => setAgama(value)}
        />
      </Layout>
      <Layout style={[styles.form, { alignItems: 'center' }]}>
        <Button
          onPress={handleForm}
          status='success'
          style={{ width: '50%', marginVertical: 10 }}
        >
          Next
        </Button>
      </Layout>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '90%',
    marginVertical: 2
  },
  label: {
    color: '#778899',
    fontSize: 12
  }
});

export default RegisterForm1;
