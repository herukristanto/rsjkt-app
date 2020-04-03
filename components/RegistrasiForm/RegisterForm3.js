import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import { RegisterContext } from '../../context/RegisterContext';
import { ADD_FORM } from '../../reducer/RegisterReducer';

const RegisterForm3 = props => {
  const { setStep } = props;
  const { state, dispatch } = useContext(RegisterContext);

  const [namaKeluarga, setNamaKeluarga] = useState(state.form.namaKeluarga);
  const [hubunganKeluarga, setHubunganKeluarga] = useState(
    state.form.hubunganKeluarga
  );
  const [alamatKeluarga, setAlamatKeluarga] = useState(
    state.form.alamatKeluarga
  );
  const [rtKeluarga, setRtKeluarga] = useState(state.form.rtKeluarga);
  const [rwKeluarga, setRwKeluarga] = useState(state.form.rwKeluarga);
  const [kotaKeluarga, setKotaKeluarga] = useState(state.form.kotaKeluarga);
  const [kodePosKeluarga, setKodePosKeluarga] = useState(
    state.form.kodePosKeluarga
  );
  const [telpKeluarga, setTelpKeluarga] = useState(state.form.telpKeluarga);
  const [telp2Keluarga, setTelp2Keluarga] = useState(state.form.telp2Keluarga);
  const [emailKeluarga, setEmailKeluarga] = useState(state.form.emailKeluarga);
  const [namaAyah, setNamaAyah] = useState(state.form.namaAyah);
  const [pekerjaanAyah, setPekerjaahAyah] = useState(state.form.pekerjaanAyah);
  const [namaIbu, setNamaIbu] = useState(state.form.namaIbu);

  const handleForm = () => {
    dispatch({
      type: ADD_FORM,
      form: {
        namaKeluarga,
        hubunganKeluarga,
        alamatKeluarga,
        rtKeluarga,
        rwKeluarga,
        kotaKeluarga,
        kodePosKeluarga,
        telpKeluarga,
        telp2Keluarga,
        emailKeluarga,
        namaAyah,
        pekerjaanAyah,
        namaIbu
      }
    });
    setStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  return (
    <React.Fragment>
      <Text category='h4'>Keluarga Terdekat</Text>
      <Layout style={styles.form}>
        <Input
          label='Nama'
          placeholder='Masukkan Nama'
          value={namaKeluarga}
          onChangeText={text => setNamaKeluarga(text)}
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Hubungan'
          placeholder='Masukkan Hubungan'
          value={hubunganKeluarga}
          onChangeText={text => setHubunganKeluarga(text)}
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Alamat'
          placeholder='Masukkan Alamat'
          multiline={true}
          value={alamatKeluarga}
          onChangeText={text => setAlamatKeluarga(text)}
        />
      </Layout>
      <Layout
        style={[
          styles.form,
          { flexDirection: 'row', justifyContent: 'space-between' }
        ]}
      >
        <Input
          label='RT'
          placeholder='Masukkan RT'
          value={rtKeluarga}
          onChangeText={text => setRtKeluarga(text)}
          keyboardType='number-pad'
          style={{ width: '48%' }}
        />
        <Input
          label='RW'
          placeholder='Masukkan RW'
          value={rwKeluarga}
          onChangeText={text => setRwKeluarga(text)}
          keyboardType='number-pad'
          style={{ width: '48%' }}
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Kota'
          placeholder='Masukkan Kota'
          value={kotaKeluarga}
          onChangeText={text => setKotaKeluarga(text)}
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Kode Pos'
          placeholder='Masukkan Kode Pos'
          value={kodePosKeluarga}
          onChangeText={text => setKodePosKeluarga(text)}
          keyboardType='number-pad'
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Telp'
          placeholder='Masukkan Telp'
          value={telpKeluarga}
          onChangeText={text => setTelpKeluarga(text)}
          keyboardType='number-pad'
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Telp2'
          placeholder='Masukkan Telp2'
          value={telp2Keluarga}
          onChangeText={text => setTelp2Keluarga(text)}
          keyboardType='number-pad'
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Email'
          placeholder='Masukkan Email'
          value={emailKeluarga}
          onChangeText={text => setEmailKeluarga(text)}
          keyboardType='email-address'
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Nama Ayah'
          placeholder='Masukkan Nama Ayah'
          value={namaAyah}
          onChangeText={text => setNamaAyah(text)}
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Pekerjaan Ayah'
          placeholder='Masukkan Pekerjaan Ayah'
          value={pekerjaanAyah}
          onChangeText={text => setPekerjaahAyah(text)}
        />
      </Layout>
      <Layout style={styles.form}>
        <Input
          label='Nama Ibu'
          placeholder='Masukkan Nama Ibu'
          value={namaIbu}
          onChangeText={text => setNamaIbu(text)}
        />
      </Layout>
      <Layout
        style={[
          styles.form,
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }
        ]}
      >
        <Button
          onPress={handleBack}
          status='success'
          style={{ width: '40%', marginVertical: 10 }}
        >
          Back
        </Button>
        <Button
          onPress={handleForm}
          status='success'
          style={{ width: '40%', marginVertical: 10 }}
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

export default RegisterForm3;
