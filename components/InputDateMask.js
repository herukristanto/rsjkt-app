import React from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { getIn, useFormikContext } from 'formik';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';

const InputDateMask = ({ name, ...props }) => {
  const { values, setFieldValue } = useFormikContext();

  return (
    <Layout style={styles.container}>
      <TextInputMask
        {...props}
        type={'datetime'}
        options={{
          format: 'DD/MM/YYYY',
        }}
        value={getIn(values, name)}
        onChangeText={(text) => setFieldValue(name, text)}
        style={styles.form}
        placeholder='22/01/1997'
        placeholderTextColor='#C5CEE0'
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
  },
  form: {
    backgroundColor: '#F7F9FC',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E4E9F2',
    borderRadius: 5,
  },
});

export default InputDateMask;
