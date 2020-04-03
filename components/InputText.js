import React from 'react';
import { View, Text } from 'react-native';
import { getIn, useFormikContext } from 'formik';
import { Input } from '@ui-kitten/components';

const InputText = ({ name, ...props }) => {
  const { values, handleChange, handleBlur } = useFormikContext();

  return (
    <React.Fragment>
      <Input
        {...props}
        value={getIn(values, name)}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
      />
    </React.Fragment>
  );
};

export default InputText;
