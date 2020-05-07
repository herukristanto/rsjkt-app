import React, { useState, useRef, useEffect } from 'react';
import { Text, Icon } from '@ui-kitten/components';
import { TouchableOpacity, StyleSheet, View, TextInput } from 'react-native';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

const Header = ({ onSearch, title, placeholder }) => {
  const navigation = useNavigation();
  const [searching, setSearching] = useState(false);
  const [klinik, setKlinik] = useState('');
  const inputRef = useRef();

  const toggleSearch = () => {
    setSearching(true);
  };

  useEffect(() => {
    if (searching) {
      inputRef.current.focus();
    }
  }, [searching]);

  const onSubmit = () => {
    onSearch(klinik);
    setSearching(false);
    setKlinik('');
  };

  return (
    <React.Fragment>
      <View style={styl.topbar} />
      {searching ? (
        <View style={styl.header}>
          <TouchableOpacity onPress={() => setSearching(false)}>
            <Text style={{ color: 'white' }}>Cancel</Text>
          </TouchableOpacity>
          <TextInput
            value={klinik}
            placeholder={placeholder}
            onChangeText={(text) => setKlinik(text)}
            style={styl.input}
            ref={inputRef}
          />
          <TouchableOpacity onPress={onSubmit}>
            <Text style={{ color: 'white' }}>Filter</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styl.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              style={{ width: 32, height: 32 }}
              fill='white'
              name='arrow-back'
            />
          </TouchableOpacity>
          <Text
            category='h5'
            style={{ textAlign: 'center', marginLeft: 8, color: 'white' }}
          >
            {title}
          </Text>
          <TouchableOpacity onPress={toggleSearch}>
            <Icon
              style={{ width: 24, height: 24 }}
              fill='white'
              name='search'
            />
          </TouchableOpacity>
        </View>
      )}
    </React.Fragment>
  );
};

const styl = StyleSheet.create({
  topbar: {
    height: Constants.statusBarHeight,
  },
  header: {
    backgroundColor: '#ecf2f2',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: 'rgb(7,94,85)',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '60%',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    color: 'white',
  },
});

export default Header;
