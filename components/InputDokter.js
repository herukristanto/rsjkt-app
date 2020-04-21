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
import moment from 'moment';
import 'moment/locale/id';

import { PoliklinikContext } from '../context/PoliklinikContext';
import { GET_DAFTAR_JADWAL } from '../reducer/PoliklinikReducer';
import { getUnique } from '../utils/helpers';

const InputDokter = ({ name, label, items, ...props }) => {
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState('');
  const [daftarJadwal, setDaftarJadwal] = useState([]);
  const { setFieldValue, errors, touched, values } = useFormikContext();
  const { state, dispatch } = useContext(PoliklinikContext);

  const error = getIn(errors, name);
  const touch = getIn(touched, name);

  const getJadwalFromDokter = (dokter) => {
    const rawJadwal = state.daftarDokter.map((item) => {
      if (item.Dokter_ID === dokter) {
        const hari = moment(item.Tanggal).format('dddd');
        return {
          poli: item.Poli_nm.trim(),
          hari: hari,
          jamAwal: item.Jam_AwalFix.trim(),
          jamAkhir: item.Jam_AkhirFix.trim(),
          date: moment(item.Tanggal).format('YYYY-MM-DD'),
          tanggal: moment(item.Tanggal).format('DD/MM/YYYY'),
          TidakPraktek: item.TidakPraktek,
          color: item.TidakPraktek ? 'red' : 'black',
          label: `${hari}, ${moment(item.Tanggal).format(
            'DD/MM/YYYY'
          )}, ${item.Jam_AwalFix.trim()} - ${item.Jam_AkhirFix.trim()}`,
          value: `${hari}, ${moment(item.Tanggal).format(
            'DD/MM/YYYY'
          )}, ${item.Jam_AwalFix.trim()} - ${item.Jam_AkhirFix.trim()}`,
        };
      }
      return;
    });
    const filteredJadwal = rawJadwal.filter(Boolean);
    filteredJadwal.sort(
      (a, b) =>
        new moment(a.date).format('YYYYMMDD') -
        new moment(b.date).format('YYYYMMDD')
    );

    return filteredJadwal;
  };

  const handleSelect = (label, value) => {
    setFieldValue(name, value);
    setFieldValue(`_label_${name}`, label);
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
            <TouchableWithoutFeedback
              onPress={() => handleSelect(item.label, item.value)}
            >
              <Text numberOfLines={2}>{item.label}</Text>
            </TouchableWithoutFeedback>
          </Layout>
          {checked == item.value ? (
            <TouchableWithoutFeedback onPress={() => setChecked(false)}>
              <Icon name='arrow-ios-upward' width={32} height={32} />
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback onPress={() => getJadwal(item.value)}>
              <Icon name='arrow-ios-downward' width={32} height={32} />
            </TouchableWithoutFeedback>
          )}
        </Layout>
        {checked == item.value && (
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
                  <Text
                    style={{ color: jadwal.TidakPraktek ? 'red' : 'black' }}
                  >
                    {jadwal.hari} {jadwal.TidakPraktek ? '(Tidak Praktek)' : ''}
                  </Text>
                </View>
                <View style={{ width: '40%', paddingVertical: 5 }}>
                  <Text
                    style={{ color: jadwal.TidakPraktek ? 'red' : 'black' }}
                  >
                    {jadwal.tanggal}
                  </Text>
                </View>
                <View style={{ width: '35%', paddingVertical: 5 }}>
                  <Text
                    style={{ color: jadwal.TidakPraktek ? 'red' : 'black' }}
                  >
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
          backdropColor='white'
          isVisible={visible}
          coverScreen
          onBackButtonPress={() => setVisible(false)}
        >
          <Layout style={styles.screen}>
            <List
              data={items.length > 0 ? getUnique(items, 'Dokter_ID') : []}
              renderItem={renderItem}
            />
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
