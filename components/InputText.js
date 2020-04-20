import React from 'react';
import { getIn, useFormikContext } from 'formik';
import { Input } from '@ui-kitten/components';

const InputText = ({ name, ...props }) => {
  const { values, setFieldValue, errors } = useFormikContext();
  const error = getIn(errors, name);

  return (
    <React.Fragment>
      <Input
        {...props}
        value={getIn(values, name)}
        onChangeText={(value) => setFieldValue(name, value)}
        status={error ? 'danger' : 'basic'}
        caption={error ? error : ''}
      />
    </React.Fragment>
  );
};

export default InputText;
