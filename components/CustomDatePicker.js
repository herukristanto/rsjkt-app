import React, { useState } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Input } from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomDatePicker = ({ value, setValue }) => {
  const [visible, setVisible] = useState(false);

  const onChange = (event, selectedDate) => {
    setVisible(false);
    const currentDate = selectedDate ? selectedDate : value;
    setValue(currentDate);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setVisible(true)}>
        <View>
          <View pointerEvents='none'>
            <Input value={value.toDateString()} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      {visible && (
        <DateTimePicker value={value} mode='date' onChange={onChange} />
      )}
    </>
  );
};

export default CustomDatePicker;
