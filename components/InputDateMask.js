import React from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { getIn, useFormikContext } from 'formik';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

const InputDateMask = ({ name, ...props }) => {
  const { values, setFieldValue, errors, touched } = useFormikContext();
  const error = getIn(errors, name);
  const touch = getIn(touched, name);

  return (
    <Layout style={styles.container}>
      <TextInputMask
        type={'datetime'}
        options={{
          format: 'DD/MM/YYYY',
        }}
        value={getIn(values, name)}
        onChangeText={(text) => setFieldValue(name, text)}
        style={[
          styles.form,
          { borderColor: error && touch ? 'red' : '#E4E9F2' },
        ]}
        placeholder="dd/mm/yyyy"
        placeholderTextColor="#C5CEE0"
        {...props}
      />
      {error && touch ? <Text style={styles.textHelp}>{error}</Text> : null}
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
    borderRadius: 5,
  },
  textHelp: {
    color: 'red',
    fontSize: 12,
  },
});

export default InputDateMask;
