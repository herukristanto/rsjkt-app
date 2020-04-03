import React, { useState, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
  Input,
  RadioGroup,
  Radio,
  Button
} from '@ui-kitten/components';

import Picker from '../Picker';
import CustomDatePicker from '../CustomDatePicker';

const RegisterForm1 = props => {
  const { setForm, setStep, form } = props;

  const [namaLengkap, setNamaLengkap] = useState(form.namaLengkap);
  const [namaPanggilan, setNamaPanggilan] = useState(form.namaPanggilan);
  const [identitas, setIdentitas] = useState(form.identitas);
  const [noIndentitas, setNoIndentitas] = useState(form.noIndentitas);
  const [tanggalLahir, setTanggalLahir] = useState(form.tanggalLahir);
  const [kelamin, setKelamin] = useState(form.kelamin);
  const [darah, setDarah] = useState(form.darah);
  const [pendidikan, setPendidikan] = useState(form.pendidikan);
  const [agama, setAgama] = useState(form.agama);

  const handleForm = () => {
    setForm(prevForm => {
      return {
        ...prevForm,
        namaLengkap,
        namaPanggilan,
        identitas,
        noIndentitas,
        tanggalLahir,
        kelamin,
        darah,
        pendidikan,
        agama
      };
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
        <Picker
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
        <Picker
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
        <Picker
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
