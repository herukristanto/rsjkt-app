import React from 'react';
import { getIn, useFormikContext } from 'formik';
import { Calendar } from 'react-native-calendars';
import { Text } from '@ui-kitten/components';

const InputMultipleDate = ({ name, ...props }) => {
  const { values, setFieldValue, errors, touched } = useFormikContext();
  const error = getIn(errors, name);
  const touch = getIn(touched, name);
  const value = getIn(values, name);

  const selectDate = (day) => {
    // '2020-07-16': { selected: true },
    let dates = { ...value };
    if (value[day.dateString]) {
      delete dates[day.dateString];
    } else {
      dates[day.dateString] = { selected: true };
    }
    const result = Object.keys(dates);
    setFieldValue('tanggals', result);
    setFieldValue(name, dates);
  };

  return (
    <React.Fragment>
      <Text style={{ color: '#8F9BB3', marginVertical: 5 }} category='c1'>
        Tanggal (Bisa memilih lebih dari 1 tanggal)
      </Text>
      <Calendar markedDates={value} onDayPress={selectDate} {...props} />
      {error && touch && (
        <Text style={{ color: 'red', marginTop: 5 }} category='c1'>
          {error}
        </Text>
      )}
    </React.Fragment>
  );
};

export default InputMultipleDate;
