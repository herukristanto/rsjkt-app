import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useTheme, Text } from '@ui-kitten/components';
import { getIn, useFormikContext } from 'formik';

const InputSelect = ({ placeholder, name, ...props }) => {
  const { values, setFieldValue, errors, touched } = useFormikContext();
  const error = getIn(errors, name);
  const touch = getIn(touched, name);

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
          paddingRight: 30, // to ensure the text is never behind the icon
        },
        inputAndroid: {
          fontSize: 16,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderWidth: 0.8,
          borderColor:
            error && touch ? 'red' : theme['color-basic-focus-border'],
          borderRadius: 4,
          color: 'black',
          paddingRight: 30, // to ensure the text is never behind the icon
          backgroundColor: theme['color-basic-hover'],
        },
        textHelp: {
          color: 'red',
          fontSize: 12,
        },
      }),
    [error, touch]
  );

  const onChange = (value) => {
    setFieldValue(name, value);
    if (props.additionalHandler) {
      props.additionalHandler(value);
    }
  };

  return (
    <React.Fragment>
      <RNPickerSelect
        {...props}
        value={getIn(values, name)}
        onValueChange={onChange}
        useNativeAndroidPickerStyle={false}
        style={pickerSelectStyles}
        placeholder={{
          label: placeholder,
          value: null,
          color: '#9EA0A4',
        }}
      />
      {error && touch ? (
        <Text style={pickerSelectStyles.textHelp}>{error}</Text>
      ) : null}
    </React.Fragment>
  );
};

export default InputSelect;
