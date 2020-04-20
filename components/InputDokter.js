import React, { useState, useContext } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import {
  Input,
  Layout,
  Button,
  ListItem,
  List,
  Text,
  Icon,
  Card,
} from '@ui-kitten/components';
import { useFormikContext, getIn } from 'formik';
import Modal from 'react-native-modal';

import { PoliklinikContext } from '../context/PoliklinikContext';
import { GET_DAFTAR_JADWAL } from '../reducer/PoliklinikReducer';
import { getDateFromDay } from '../utils/helpers';

const InputDokter = ({ name, label, items, ...props }) => {
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState('');
  const [daftarJadwal, setDaftarJadwal] = useState([]);
  const { values, setFieldValue, errors, touched } = useFormikContext();
  const { state, dispatch } = useContext(PoliklinikContext);

  const error = getIn(errors, name);
  const touch = getIn(touched, name);

  const getJadwalFromDokter = (dokter) => {
    const rawJadwal = state.daftarPraktek.map((item) => {
      if (item.Dokter_nm.trim() == dokter) {
        const date = getDateFromDay(item.DayofWeek);
        return {
          hari: item.nm_day.trim(),
          jamAwal: item.Jam_AwalFix.trim(),
          jamAkhir: item.Jam_AkhirFix.trim(),
          tanggal: date.format('DD MMMM YYYY'),
          label: `${item.nm_day.trim()}, ${date.format(
            'DD MMMM YYYY'
          )}, ${item.Jam_AwalFix.trim()} - ${item.Jam_AkhirFix.trim()}`,
          value: `${item.nm_day.trim()}, ${date.format(
            'DD MMMM YYYY'
          )}, ${item.Jam_AwalFix.trim()} - ${item.Jam_AkhirFix.trim()}`,
        };
      }
      return;
    });
    const filteredJadwal = rawJadwal.filter(Boolean);
    return filteredJadwal;
  };

  const handleSelect = (value) => {
    setFieldValue(name, value);
    let daftarJadwalDokter = daftarJadwal;
    if (daftarJadwal.length === 0) {
      daftarJadwalDokter = getJadwalFromDokter(value);
    }
    dispatch({
      type: GET_DAFTAR_JADWAL,
      daftarJadwal: daftarJadwalDokter,
    });
    setVisible(false);
  };

  const getJadwal = (value) => {
    setChecked(value);
    const jadwalDokter = getJadwalFromDokter(value);
    setDaftarJadwal(jadwalDokter);
  };

  const renderItem = ({ item, index }) => (
    <ListItem>
      <Card style={{ flex: 1 }}>
        <Layout
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Layout style={{ flexShrink: 1 }}>
            <TouchableWithoutFeedback onPress={() => handleSelect(item.label)}>
              <Text numberOfLines={2}>{item.label}</Text>
            </TouchableWithoutFeedback>
          </Layout>
          {checked == item.label ? (
            <TouchableWithoutFeedback onPress={() => setChecked(false)}>
              <Icon name='arrow-ios-upward' width={32} height={32} />
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback onPress={() => getJadwal(item.label)}>
              <Icon name='arrow-ios-downward' width={32} height={32} />
            </TouchableWithoutFeedback>
          )}
        </Layout>
        {checked == item.label && (
          <Layout
            style={{
              borderTopWidth: 1,
              borderTopColor: 'black',
              justifyContent: 'space-around',
            }}
          >
            <View key={index} style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ width: '25%' }}>
                <Text>Hari</Text>
              </View>
              <View style={{ width: '40%' }}>
                <Text>Tanggal</Text>
              </View>
              <View style={{ width: '35%' }}>
                <Text>Jam</Text>
              </View>
            </View>
            {daftarJadwal.map((jadwal, index) => (
              <View key={index} style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ width: '25%', paddingVertical: 5 }}>
                  <Text>{jadwal.hari}</Text>
                </View>
                <View style={{ width: '40%', paddingVertical: 5 }}>
                  <Text>{jadwal.tanggal}</Text>
                </View>
                <View style={{ width: '35%', paddingVertical: 5 }}>
                  <Text>
                    {jadwal.jamAwal} - {jadwal.jamAkhir}
                  </Text>
                </View>
              </View>
            ))}
          </Layout>
        )}
      </Card>
    </ListItem>
  );

  return (
    <React.Fragment>
      <TouchableWithoutFeedback
        onPress={() => setVisible((prevState) => !prevState)}
        disabled={items.length > 0 ? false : true}
      >
        <View>
          <View pointerEvents='none'>
            <Input
              placeholder='Pilih Dokter'
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
          backdropColor='white'
          isVisible={visible}
          coverScreen
          onBackButtonPress={() => setVisible(false)}
        >
          <Layout style={styles.screen}>
            <List data={items} renderItem={renderItem} />
            <Button
              status='warning'
              textStyle={{ color: 'black' }}
              onPress={() => setVisible((prevState) => !prevState)}
            >
              Tutup
            </Button>
          </Layout>
        </Modal>
      </Layout>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: 400,
  },
  textHelp: {
    color: 'red',
    fontSize: 12,
  },
});

export default InputDokter;
