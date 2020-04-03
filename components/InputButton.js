import React from 'react';
import { Button } from '@ui-kitten/components';
import { useFormikContext } from 'formik';

const InputButton = ({ label, ...props }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <React.Fragment>
      <Button {...props} onPress={() => handleSubmit()}>
        {label}
      </Button>
    </React.Fragment>
  );
};

export default InputButton;
