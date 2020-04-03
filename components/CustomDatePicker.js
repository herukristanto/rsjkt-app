import React, { useState } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Input } from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFormikContext, getIn } from 'formik';

const CustomDatePicker = ({ name, ...props }) => {
  const [visible, setVisible] = useState(false);
  const { values, setFieldValue } = useFormikContext();

  const onChange = (event, selectedDate) => {
    setVisible(false);
    const currentDate = selectedDate ? selectedDate : getIn(values, name);
    setFieldValue(name, currentDate);
  };

  return (
    <React.Fragment>
      <TouchableWithoutFeedback onPress={() => setVisible(true)}>
        <View>
          <View pointerEvents='none'>
            <Input value={getIn(values, name).toDateString()} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      {visible && (
        <DateTimePicker
          value={getIn(values, name)}
          onChange={onChange}
          {...props}
        />
      )}
    </React.Fragment>
  );
};

export default CustomDatePicker;
