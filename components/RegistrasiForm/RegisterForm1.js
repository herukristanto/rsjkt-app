import React, { useState, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
  Input,
  RadioGroup,
  Radio,
  Button,
  useTheme
} from '@ui-kitten/components';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegisterForm1 = props => {
  const { setForm, setStep, form } = props;
  const theme = useTheme();

  const [namaLengkap, setNamaLengkap] = useState(form.namaLengkap);
  const [namaPanggilan, setNamaPanggilan] = useState(form.namaPanggilan);
  const [identitas, setIdentitas] = useState(form.identitas);
  const [noIndentitas, setNoIndentitas] = useState(form.noIndentitas);
  const [tanggalLahir, setTanggalLahir] = useState(form.tanggalLahir);
  const [kelamin, setKelamin] = useState(form.kelamin);
  const [darah, setDarah] = useState(form.darah);
  const [pendidikan, setPendidikan] = useState(form.pendidikan);
  const [agama, setAgama] = useState(form.agama);

  const [show, setShow] = useState(false);

  const pickerSelectStyles = useMemo(
    () =>
      StyleSheet.create({
        inputIOS: {
          fontSize: 16,
          paddingVertical: 12,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 4,
          color: 'black',
          paddingRight: 30 // to ensure the text is never behind the icon
        },
        inputAndroid: {
          fontSize: 16,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderWidth: 0.8,
          borderColor: theme['color-basic-focus-border'],
          borderRadius: 4,
          color: 'black',
          paddingRight: 30, // to ensure the text is never behind the icon
          backgroundColor: theme['color-basic-hover']
        }
      }),
    []
  );

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

  const onChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate ? selectedDate : tanggalLahir;
    setTanggalLahir(currentDate);
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
        <RNPickerSelect
          value={identitas}
          onValueChange={value => setIdentitas(value)}
          items={[
            { label: 'KTP', value: 'ktp' },
            { label: 'SIM', value: 'sim' }
          ]}
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
          placeholder={{
            label: 'Pilih Identitas',
            value: null,
            color: '#9EA0A4'
          }}
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
        <Layout
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Text>{tanggalLahir.toDateString()}</Text>
          <Button status='success' size='small' onPress={() => setShow(true)}>
            Pilih Tanggal Lahir
          </Button>
          {show && (
            <DateTimePicker
              value={tanggalLahir}
              mode='date'
              onChange={onChange}
            />
          )}
        </Layout>
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
        <RNPickerSelect
          value={darah}
          onValueChange={value => setDarah(value)}
          items={[
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'AB', value: 'ab' },
            { label: 'O', value: 'o' }
          ]}
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
          placeholder={{
            label: 'Pilih Golongan Darah',
            value: null,
            color: '#9EA0A4'
          }}
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
        <RNPickerSelect
          value={agama}
          onValueChange={value => setAgama(value)}
          items={[
            { label: 'Islam', value: 'islam' },
            { label: 'Kristen', value: 'kristen' },
            { label: 'Katolik', value: 'katolik' },
            { label: 'Hindu', value: 'hindu' },
            { label: 'Budha', value: 'budha' },
            { label: 'Khong Hu Cu', value: 'khong_hu_cu' }
          ]}
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
          placeholder={{
            label: 'Pilih Agama',
            value: null,
            color: '#9EA0A4'
          }}
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
