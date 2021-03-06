import React from 'react';
import { useFormikContext, getIn } from 'formik';
import { RadioGroup, Radio } from '@ui-kitten/components';

const InputRadio = ({ name, items, disabledRadio = false, ...props }) => {
  const { values, setFieldValue } = useFormikContext();

  return (
    <React.Fragment>
      <RadioGroup
        selectedIndex={getIn(values, name)}
        onChange={(index) => setFieldValue(name, index)}
        {...props}
      >
        {items.map((item, index) => (
          <Radio key={index} text={item} disabled={disabledRadio} />
        ))}
      </RadioGroup>
    </React.Fragment>
  );
};

export default InputRadio;
