import React, { useState, useContext } from 'react';
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
import { getUnique } from '../../utils/helpers';
import InputSelect from '../InputSelect';
import { PoliklinikContext } from '../../context/PoliklinikContext';
import {
  GET_DAFTAR_DOKTER,
  GET_DAFTAR_JADWAL,
  ADD_TO_FORM,
  GET_DAFTAR_PERUSAHAAN
} from '../../reducer/PoliklinikReducer';

const RegistrasiPoliklinik1 = props => {
  const { setStep } = props;
  const { state, dispatch } = useContext(PoliklinikContext);

  const [dokter, setDokter] = useState(state.form.dokter);
  const [poliklinik, setPoliklinik] = useState(state.form.poliklinik);
  const [tanggal, setTanggal] = useState(state.form.tanggal);
  const [status, setStatus] = useState(state.form.status);
  const [jaminan, setJaminan] = useState(state.form.jaminan);
  const [perusahaan, setPerusahaan] = useState(state.form.perusahaan);

  const handlePoliklinik = async value => {
    setPoliklinik(value);

    const rawDokter = state.daftarPraktek.map(item => {
      if (item.Poli_nm.trim() == value) {
        return {
          value: item.Dokter_nm.trim(),
          label: item.Dokter_nm.trim()
        };
      }
    });
    const dokterUnique = await getUnique(rawDokter, 'label');

    dispatch({
      type: GET_DAFTAR_DOKTER,
      daftarDokter: dokterUnique
    });
  };

  const handleDokter = async value => {
    setDokter(value);

    const rawJadwal = state.daftarPraktek.map(item => {
      if (item.Dokter_nm.trim() == value) {
        return {
          label: `${item.nm_day.trim()}, ${item.Jam_Awal.trim()} - ${item.Jam_Akhir.trim()}`,
          value: `${item.nm_day.trim()}, ${item.Jam_Awal.trim()} - ${item.Jam_Akhir.trim()}`
        };
      }
      return;
    });
    const filteredJadwal = rawJadwal.filter(Boolean);
    dispatch({
      type: GET_DAFTAR_JADWAL,
      daftarJadwal: filteredJadwal
    });
  };

  const handlePenjamin = async value => {
    setJaminan(value);

    const rawPerusahaan = state.daftarPenjamin.map(item => {
      if (item.Nm_jaminan.trim() == value) {
        return {
          label: item.NM_AnakJMN.trim(),
          value: item.NM_AnakJMN.trim()
        };
      }
      return;
    });
    const filteredPerusahaan = rawPerusahaan.filter(Boolean);
    dispatch({
      type: GET_DAFTAR_PERUSAHAAN,
      daftarPerusahaan: filteredPerusahaan
    });
  };

  const handleForm = () => {
    dispatch({
      type: ADD_TO_FORM,
      data: {
        dokter,
        poliklinik,
        tanggal,
        status,
        jaminan,
        perusahaan
      }
    });
    setStep(prevStep => prevStep + 1);
  };

  const RenderJaminan = () => {
    return (
      <>
        <Layout style={styles.form}>
          <Text style={styles.label}>Jaminan</Text>
          <InputSelect
            placeholder='Pilih Jaminan'
            data={state.daftarJaminan}
            value={jaminan}
            onChange={value => handlePenjamin(value)}
          />
        </Layout>
        <Layout style={styles.form}>
          <Text style={styles.label}>Perusahaan</Text>
          <InputSelect
            placeholder='Pilih Perusahaan'
            data={state.daftarPerusahaan}
            value={perusahaan}
            onChange={value => setPerusahaan(value)}
          />
        </Layout>
        <Layout style={styles.form}>
          <Input
            label='No Kartu'
            placeholder='Masukkan No Kartu'
            value={`${state.form.noKartu}`}
            disabled={true}
          />
        </Layout>
      </>
    );
  };

  if (state.daftarPraktek.length === 0) {
    return <Spinner />;
  }

  return (
    <React.Fragment>
      <Text category='h4'>Registrasi Poliklinik</Text>
      <Layout style={styles.form}>
        <Input
          label='No Rekam Medis'
          value={`${state.form.noRekamMedis}`}
          disabled
        />
      </Layout>
      <Layout style={styles.form}>
        <Input label='Tanggal Lahir' value={state.form.tanggalLahir} disabled />
      </Layout>
      <Layout style={styles.form}>
        <Text style={styles.label}>Poliklinik</Text>
        <InputSelect
          placeholder='Pilih Poliklinik'
          data={state.daftarPoli}
          value={poliklinik}
          onChange={value => handlePoliklinik(value)}
        />
      </Layout>
      <Layout style={styles.form}>
        <Text style={styles.label}>Dokter</Text>
        <InputSelect
          placeholder='Pilih Dokter'
          data={state.daftarDokter}
          value={dokter}
          onChange={value => handleDokter(value)}
        />
      </Layout>
      <Layout style={styles.form}>
        <Text style={styles.label}>Tanggal Kunjungan</Text>
        <InputSelect
          placeholder='Pilih Tanggal Kunjungan'
          data={state.daftarJadwal}
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
