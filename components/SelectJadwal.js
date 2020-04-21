import React, { useState } from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import {
  Input,
  Text,
  Modal,
  Layout,
  List,
  ListItem,
} from '@ui-kitten/components';
import { useFormikContext, getIn } from 'formik';

/**
 *  @description Custom Select for Jadwal Kunjungan
 *  @param items (List of item => must have : label and value)
 *  @param placeholder
 *  @param name
 *  @param disabled Disable Entire Component
 */
const CustomSelect = ({ items, placeholder, name, disabled }) => {
  const [visible, setVisible] = useState(false);
  const { values, setFieldValue, errors, touched } = useFormikContext();

  const error = getIn(errors, name);
  const touch = getIn(touched, name);

  const onSelect = (value) => {
    setFieldValue(name, value);
    setVisible(false);
  };

  const renderItem = ({ item }) => (
    <ListItem
      onPress={() => onSelect(item.value)}
      disabled={item.TidakPraktek ? true : false}
      style={styles.list}
    >
      <Text
        style={{ fontSize: 16, color: item.TidakPraktek ? 'red' : 'black' }}
      >
        {item.label} {item.TidakPraktek ? '- Tidak Praktek' : ''}
      </Text>
    </ListItem>
  );

  return (
    <React.Fragment>
      <TouchableWithoutFeedback
        disabled={disabled}
        onPress={() => setVisible(true)}
      >
        <View>
          <View pointerEvents='none'>
            <Input
              placeholder={placeholder}
              value={getIn(values, name)}
              status={error && touch ? 'danger' : 'basic'}
            />
            {error && touch ? (
              <Text style={styles.textHelp}>{error}</Text>
            ) : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Layout style={styles.screen}>
        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}
          style={styles.modal}
        >
          <Layout style={[styles.screen, { paddingVertical: 10 }]}>
            <Text style={styles.placeholder}>{placeholder}</Text>
            <List data={items} renderItem={renderItem} />
          </Layout>
        </Modal>
      </Layout>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  modal: {
    width: '90%',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  list: {
    paddingVertical: 13,
  },
  placeholder: {
    fontSize: 16,
    marginLeft: 8,
    color: 'grey',
    marginVertical: 5,
  },
  textHelp: {
    color: 'red',
    fontSize: 12,
  },
});

export default CustomSelect;
