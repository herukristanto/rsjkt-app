import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import * as Yup from 'yup';
import { RegisterContext } from '../../context/RegisterContext';
import { ADD_FORM } from '../../reducer/RegisterReducer';
import { Formik } from 'formik';
import InputText from '../InputText';
import InputButton from '../InputButton';
import InputSelect from '../InputSelect';

const RegisterForm2 = (props) => {
  const { setStep } = props;
  const { state, dispatch } = useContext(RegisterContext);

  const handleForm = (values) => {
    dispatch({
      type: ADD_FORM,
      form: {
        ...values,
      },
    });
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const formSchema = Yup.object().shape({
    kewarganegaraan: Yup.string().required('Kewarganegaraan Wajib Diisi'),
    alamat: Yup.string().required('Alamat Wajib Diisi'),
    rt: Yup.string().required('RT Wajib Diisi').max(3, 'RT Tidak Valid'),
    rw: Yup.string().required('RW Wajib Diisi').max(3, 'RT Tidak Valid'),
    telp: Yup.string()
      .required('No Telp Wajib Diisi')
      .min(9, 'Telp Tidak Valid')
      .max(13, 'Telp Tidak Valid'),
    email: Yup.string()
      .required('Email Wajib Diisi')
      .email('Email Tidak Valid'),
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
        <Text category="h4">Alamat</Text>
        <Layout style={styles.form}>
          <Text style={styles.label}>Kewarganegaraan</Text>
          <InputSelect
            placeholder="Pilih Kewarganegaraan"
            items={[
              { label: 'WNI', value: 'wni' },
              { label: 'WNA', value: 'wna' },
            ]}
            name="kewarganegaraan"
          />
        </Layout>
        <Layout style={styles.form}>
          <InputText
            name="alamat"
            label="Alamat"
            placeholder="Masukkan Alamat"
            multiline={true}
          />
        </Layout>
        <Layout
          style={[
            styles.form,
            { flexDirection: 'row', justifyContent: 'space-between' },
          ]}
        >
          <InputText
            name="rt"
            label="RT"
            placeholder="Masukkan RT"
            keyboardType="number-pad"
            style={{ width: '48%' }}
          />
          <InputText
            name="rw"
            label="RW"
            placeholder="Masukkan RW"
            keyboardType="number-pad"
            style={{ width: '48%' }}
          />
        </Layout>
        <Layout style={styles.form}>
          <InputText
            name="telp"
            label="Telp"
            placeholder="Masukkan Telp (08*******)"
            keyboardType="number-pad"
          />
        </Layout>
        <Layout style={styles.form}>
          <InputText
            name="email"
            label="Email"
            placeholder="Masukkan Email"
            keyboardType="email-address"
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
            label="Next"
            status="success"
            style={{ width: '40%', marginVertical: 10 }}
          />
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

export default RegisterForm2;
