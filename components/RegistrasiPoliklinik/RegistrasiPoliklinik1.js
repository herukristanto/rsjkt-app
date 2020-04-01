import React, { useState, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import {
  Text,
  Layout,
  Input,
  Button,
  RadioGroup,
  Radio,
  useTheme
} from '@ui-kitten/components';
import RNPickerSelect from 'react-native-picker-select';

const RegistrasiPoliklinik1 = props => {
  const { setForm, setStep, form } = props;
  const theme = useTheme();

  const noRekamMedis = '12345';
  const tanggalLahir = '31/03/2020';

  const [dokter, setDokter] = useState(form.dokter);
  const [poliklinik, setPoliklinik] = useState(form.poliklinik);
  const [tanggal, setTanggal] = useState(form.tanggal);
  const [status, setStatus] = useState(form.status);
  const [jaminan, setJaminan] = useState(form.jaminan);
  const [perusahaan, setPerusahaan] = useState(form.perusahaan);
  const [noKartu, setNoKartu] = useState(form.noKartu);

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
        noRekamMedis,
        tanggalLahir,
        dokter,
        poliklinik,
        tanggal,
        status,
        jaminan,
        perusahaan,
        noKartu
      };
    });
    setStep(prevStep => prevStep + 1);
  };

  const RenderJaminan = () => {
    return (
      <>
        <Layout style={styles.form}>
          <Text style={styles.label}>Jaminan</Text>
          <RNPickerSelect
            value={jaminan}
            onValueChange={value => setJaminan(value)}
            items={[
              {
                label: 'BPJS',
                value: 'BPJS'
              },
              {
                label: 'AIA Financial',
                value: 'AIA Financial'
              }
            ]}
            useNativeAndroidPickerStyle={false}
            style={pickerSelectStyles}
            placeholder={{
              label: 'Pilih Jaminan',
              value: null,
              color: '#9EA0A4'
            }}
          />
        </Layout>
        <Layout style={styles.form}>
          <Text style={styles.label}>Perusahaan</Text>
          <RNPickerSelect
            onValueChange={value => setPerusahaan(value)}
            value={perusahaan}
            items={[
              {
                label: 'Institut Teknologi PLN',
                value: 'Institut Teknologi PLN'
              },
              {
                label: 'WAMPLO',
                value: 'WAMPLO'
              }
            ]}
            useNativeAndroidPickerStyle={false}
            style={pickerSelectStyles}
            placeholder={{
              label: 'Pilih Perusahaan',
              value: null,
              color: '#9EA0A4'
            }}
          />
        </Layout>
        <Layout style={styles.form}>
          <Input
            label='No Kartu'
            placeholder='Masukkan No Kartu'
            value={noKartu}
            onChangeText={text => setNoKartu(text)}
            keyboardType='number-pad'
          />
        </Layout>
      </>
    );
  };

  return (
    <React.Fragment>
      <Text category='h4'>Registrasi Poliklinik</Text>
      <Layout style={styles.form}>
        <Input label='No Rekam Medis' value={noRekamMedis} disabled />
      </Layout>
      <Layout style={styles.form}>
        <Input label='Tanggal Lahir' value={tanggalLahir} disabled />
      </Layout>
      <Layout style={styles.form}>
        <Text style={styles.label}>Poliklinik</Text>
        <RNPickerSelect
          onValueChange={value => setPoliklinik(value)}
          value={poliklinik}
          items={[
            {
              label: 'Umum',
              value: 'umum'
            },
            {
              label: 'Mata',
              value: 'mata'
            },
            {
              label: 'Jantung',
              value: 'jantung'
            },
            {
              label: 'Kulit',
              value: 'kulit'
            },
            {
              label: 'THT',
              value: 'tht'
            }
          ]}
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
          placeholder={{
            label: 'Pilih Poliklinik',
            value: null,
            color: '#9EA0A4'
          }}
        />
      </Layout>
      <Layout style={styles.form}>
        <Text style={styles.label}>Dokter</Text>
        <RNPickerSelect
          disabled={!poliklinik}
          onValueChange={value => setDokter(value)}
          value={dokter}
          items={[
            {
              label: 'dr. Abdullah Fadlol , Sp.U',
              value: 'dr. Abdullah Fadlol , Sp.U'
            },
            {
              label: 'dr. Achmad Zaki , Sp.OT',
              value: 'dr. Achmad Zaki , Sp.OT'
            },
            {
              label: 'dr. ADE RUSMIATI , Sp.P',
              value: 'dr. ADE RUSMIATI , Sp.P'
            },
            {
              label: 'dr. Adhani Jurianti , Sp.A',
              value: 'dr. Adhani Jurianti , Sp.A'
            },
            {
              label: 'dr. Adila Hisyam , SpTHT',
              value: 'dr. Adila Hisyam , SpTHT'
            }
          ]}
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
          placeholder={{
            label: 'Pilih Dokter',
            value: null,
            color: '#9EA0A4'
          }}
        />
      </Layout>
      <Layout style={styles.form}>
        <Text style={styles.label}>Tanggal Kunjungan</Text>
        <RNPickerSelect
          disabled={!dokter}
          onValueChange={value => setTanggal(value)}
          value={tanggal}
          items={[
            {
              label: '2020/03/31',
              value: new Date('2020/03/31')
            },
            {
              label: '2020/04/31',
              value: new Date('2020/04/31')
            },
            {
              label: '2020/05/31',
              value: new Date('2020/05/31')
            }
          ]}
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
          placeholder={{
            label: 'Pilih Tanggal Kunjungan',
            value: null,
            color: '#9EA0A4'
          }}
        />
      </Layout>
      <Layout style={styles.form}>
        <RadioGroup
          selectedIndex={status}
          onChange={index => setStatus(index)}
          style={{ flexDirection: 'row', justifyContent: 'space-around' }}
        >
          <Radio text='Pribadi' />
          <Radio text='Penjamin' />
        </RadioGroup>
      </Layout>

      {status == 1 && <RenderJaminan />}

      <Layout style={[styles.form, { flexDirection: 'row-reverse' }]}>
        <Button status='success' onPress={handleForm} style={{ width: '45%' }}>
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

export default RegistrasiPoliklinik1;
