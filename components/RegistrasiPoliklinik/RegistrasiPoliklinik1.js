import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  Text,
  Layout,
  Input,
  Button,
  RadioGroup,
  Radio,
  Spinner
} from '@ui-kitten/components';
import useAxios from '../../utils/useAxios';
import { getUnique } from '../../utils/helpers';
import Picker from '../Picker';

const RegistrasiPoliklinik1 = props => {
  const { setForm, setStep, form } = props;

  const [isLoading, setIsLoading] = useState(false);

  const [daftarPraktek, setDaftarPraktek] = useState([]);
  const [poliklinikName, setPoliklinikName] = useState([]);
  const [dokterName, setDokterName] = useState([]);
  const [jadwal, setJadwal] = useState([]);

  const [dokter, setDokter] = useState(form.dokter);
  const [poliklinik, setPoliklinik] = useState(form.poliklinik);
  const [tanggal, setTanggal] = useState(form.tanggal);
  const [status, setStatus] = useState(form.status);
  const [jaminan, setJaminan] = useState(form.jaminan);
  const [perusahaan, setPerusahaan] = useState(form.perusahaan);
  const [noKartu, setNoKartu] = useState(form.noKartu);

  const [, getPoli] = useAxios(
    { url: '/daftar_praktek', method: 'GET' },
    { manual: true }
  );

  const listPoliklinik = async () => {
    setIsLoading(true);
    try {
      const { data } = await getPoli({ params: { key: 'rsjkt4231' } });
      console.log('request');
      setDaftarPraktek(data);
      const poliUnique = await getUnique(data, 'Poli_nm');
      const poliData = await poliUnique.map(poli => {
        return {
          value: poli.Poli_nm.trim(),
          label: poli.Poli_nm.trim()
        };
      });

      setPoliklinikName(poliData);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    listPoliklinik();
  }, []);

  const handlePoliklinik = async value => {
    setPoliklinik(value);

    const rawDokter = daftarPraktek.map(item => {
      if (item.Poli_nm.trim() == value) {
        return {
          value: item.Dokter_nm.trim(),
          label: item.Dokter_nm.trim()
        };
      }
    });
    const dokterUnique = await getUnique(rawDokter, 'label');

    setDokterName(dokterUnique);
  };

  const handleDokter = async value => {
    setDokter(value);

    const rawJadwal = daftarPraktek.map(item => {
      if (item.Dokter_nm.trim() == value) {
        return {
          label: `${item.nm_day.trim()}, ${item.Jam_Awal.trim()} - ${item.Jam_Akhir.trim()}`,
          value: `${item.nm_day.trim()}, ${item.Jam_Awal.trim()} - ${item.Jam_Akhir.trim()}`
        };
      }
      return;
    });
    const filteredJadwal = rawJadwal.filter(Boolean);
    setJadwal(filteredJadwal);
  };

  const handleForm = () => {
    setForm(prevForm => {
      return {
        ...prevForm,
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
          <Picker
            placeholder='Pilih Jaminan'
            data={[
              {
                label: 'BPJS',
                value: 'BPJS'
              },
              {
                label: 'AIA Financial',
                value: 'AIA Financial'
              }
            ]}
            value={jaminan}
            onChange={value => setJaminan(value)}
          />
        </Layout>
        <Layout style={styles.form}>
          <Text style={styles.label}>Perusahaan</Text>
          <Picker
            placeholder='Pilih Perusahaan'
            data={[
              {
                label: 'Institut Teknologi PLN',
                value: 'Institut Teknologi PLN'
              },
              {
                label: 'WAMPLO',
                value: 'WAMPLO'
              }
            ]}
            value={perusahaan}
            onChange={value => setPerusahaan(value)}
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

  // if (isLoading) {
  //   return (
  //     <Layout style={styles.spinner}>
  //       <Spinner />
  //     </Layout>
  //   );
  // }

  return (
    <React.Fragment>
      <Text category='h4'>Registrasi Poliklinik</Text>
      <Layout style={styles.form}>
        <Input label='No Rekam Medis' value={`${form.noRekamMedis}`} disabled />
      </Layout>
      <Layout style={styles.form}>
        <Input label='Tanggal Lahir' value={form.tanggalLahir} disabled />
      </Layout>
      <Layout style={styles.form}>
        <Text style={styles.label}>Poliklinik</Text>
        <Picker
          placeholder='Pilih Poliklinik'
          data={poliklinikName}
          value={poliklinik}
          onChange={value => handlePoliklinik(value)}
        />
      </Layout>
      <Layout style={styles.form}>
        <Text style={styles.label}>Dokter</Text>
        <Picker
          placeholder='Pilih Dokter'
          data={dokterName}
          value={dokter}
          onChange={value => handleDokter(value)}
        />
      </Layout>
      <Layout style={styles.form}>
        <Text style={styles.label}>Tanggal Kunjungan</Text>
        <Picker
          placeholder='Pilih Tanggal Kunjungan'
          data={jadwal}
          value={tanggal}
          onChange={value => setTanggal(value)}
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
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default RegistrasiPoliklinik1;
