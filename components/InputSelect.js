import React, { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useTheme } from '@ui-kitten/components';

const InputSelect = ({ placeholder, data, value, onChange }) => {
  const theme = useTheme();
  const pickerSelectStyles = useMemo(
    () =>
      StyleSheet.create({
        inputIOS: {
          fontSize: 16,
          paddingVertical: 12,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 4,
          color: 'black',
          paddingRight: 30 // to ensure the text is never behind the icon
        },
        inputAndroid: {
          fontSize: 16,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderWidth: 0.8,
          borderColor: theme['color-basic-focus-border'],
          borderRadius: 4,
          color: 'black',
          paddingRight: 30, // to ensure the text is never behind the icon
          backgroundColor: theme['color-basic-hover']
        }
      }),
    []
  );

  return (
    <RNPickerSelect
      value={value}
      onValueChange={onChange}
      items={data}
      useNativeAndroidPickerStyle={false}
      style={pickerSelectStyles}
      placeholder={{
        label: placeholder,
        value: null,
        color: '#9EA0A4'
      }}
    />
  );
};

export default InputSelect;
