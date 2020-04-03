import React from 'react';
import { getIn, useFormikContext } from 'formik';
import { Input } from '@ui-kitten/components';

const InputText = ({ name, ...props }) => {
  const { values, setFieldValue } = useFormikContext();

  return (
    <React.Fragment>
      <Input
        {...props}
        value={getIn(values, name)}
        onChangeText={value => setFieldValue(name, value)}
      />
    </React.Fragment>
  );
};

export default InputText;
