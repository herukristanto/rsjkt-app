import React from 'react';
import { getIn, useFormikContext } from 'formik';
import { Input } from '@ui-kitten/components';

const InputText = ({ name, ...props }) => {
  const { values, setFieldValue, errors, touched } = useFormikContext();
  const error = getIn(errors, name);
  const touch = getIn(touched, name);

  return (
    <React.Fragment>
      <Input
        {...props}
        value={getIn(values, name)}
        onChangeText={(value) => setFieldValue(name, value)}
        status={error && touch ? 'danger' : 'basic'}
        caption={error && touch ? error : ''}
      />
    </React.Fragment>
  );
};

export default InputText;
