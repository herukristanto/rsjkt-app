import React, { useState, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  BackHandler,
} from 'react-native';
import { Input, Text, Modal, Layout } from '@ui-kitten/components';
import { useFormikContext, getIn } from 'formik';
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from 'recyclerlistview';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};

const SelectJaminan = ({ items, placeholder, name, handlePenjamin }) => {
  const [visible, setVisible] = useState(false);
  const { values, setFieldValue, errors, touched } = useFormikContext();
  const [query, setQuery] = useState('');
  const [jaminans, setJaminans] = useState(items);
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      if (visible) {
        setVisible(false);
        return true;
      } else {
        navigation.goBack();
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [visible]);

  const list = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(jaminans);
  const layoutProvider = new LayoutProvider(
    (i) => {
      return ViewTypes.FULL;
    },
    (type, dim) => {
      switch (type) {
        case ViewTypes.FULL:
          dim.width = width;
          dim.height = 50;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
          break;
      }
    }
  );

  const error = getIn(errors, name);
  const touch = getIn(touched, name);

  const handleQuery = (text) => {
    setQuery(text);
    const initJaminan = [...items];
    const newJaminan = initJaminan.map((jaminan) => {
      const searchJaminan = jaminan.label
        .toLowerCase()
        .includes(text.toLowerCase());
      if (searchJaminan) {
        return jaminan;
      }
    });
    const result = newJaminan.filter(Boolean);
    setJaminans(result);
  };

  const onSelect = (data) => {
    setFieldValue(name, data.value);
    handlePenjamin(data.value);
    setFieldValue(`_label_${name}`, data.label);
    setVisible(false);
  };

  const renderItem = (type, data) => {
    return (
      <TouchableOpacity onPress={() => onSelect(data)} style={styles.list}>
        <Text style={{ fontSize: 16 }}>{data.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <React.Fragment>
      <TouchableWithoutFeedback onPress={() => setVisible(true)}>
        <View>
          <View pointerEvents='none'>
            <Input
              placeholder={placeholder}
              value={getIn(values, `_label_${name}`)}
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
          <Layout style={[styles.screen]}>
            <Layout style={styles.searchContainer}>
              <TextInput
                placeholder={placeholder}
                value={query}
                onChangeText={(text) => handleQuery(text)}
                style={styles.searchBox}
              />
            </Layout>
            {jaminans.length > 0 && (
              <RecyclerListView
                style={{ flex: 1 }}
                rowRenderer={renderItem}
                dataProvider={list}
                layoutProvider={layoutProvider}
              />
            )}
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
    height: height * 0.8,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  list: {
    paddingVertical: 13,
    marginHorizontal: 5,
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
  searchContainer: {
    margin: 5,
  },
  searchBox: {
    paddingVertical: 3,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});

export default SelectJaminan;
