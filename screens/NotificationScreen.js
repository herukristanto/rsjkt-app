import React, { useState, useEffect, useContext } from 'react';
import { Layout, TabView, Tab, Text, Spinner } from '@ui-kitten/components';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import { AppContext } from '../context/AppContext';
import { useRoute } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const NotificationScreen = () => {
  const { state } = useContext(AppContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [transaksi, setTransaksi] = useState();
  const [update, setUpdate] = useState();
  const [loading, setLoading] = useState(true);
  const route = useRoute();

  useEffect(() => {
    const getNotification = async () => {
      try {
        const dummyData = route.params.data;

        const transaksiList = dummyData.filter(
          (t) =>
            t.tipe === 'Registrasi' ||
            t.tipe === 'Antrian' ||
            t.tipe === 'Feedback'
        );
        const updateList = dummyData.filter((t) => t.tipe === 'Promo');

        setTransaksi(transaksiList);
        setUpdate(updateList);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getNotification();
  }, []);

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  const Item = ({ data }) => {
    return (
      <TouchableOpacity
        style={[
          styles.item,
          { backgroundColor: data.readed ? 'white' : '#d9d9d9' },
        ]}
      >
        <Text>
          {data.tipe} - {moment(data.tanggal).format('DD MMMM Y')}
        </Text>
        <Text status='success' style={{ fontWeight: 'bold' }}>
          {data.judul}
        </Text>
        <Text>"{data.isi}"</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Spinner status='success' />
      </Layout>
    );
  }

  return (
    <TabView
      selectedIndex={selectedIndex}
      onSelect={handleSelect}
      indicatorStyle={styles.selectedTab}
    >
      <Tab
        title='Transaksi'
        titleStyle={[
          styles.tabTitle,
          { color: selectedIndex === -0 ? 'rgb(7,94,85)' : '#8c8c8c' },
        ]}
      >
        <ScrollView style={{ height: height * 0.85 }}>
          {state.isLogin ? (
            transaksi.map((data, index) => <Item data={data} key={index} />)
          ) : (
            <Text>Data Tidak Ditemukan</Text>
          )}
        </ScrollView>
      </Tab>
      <Tab
        title='Update'
        titleStyle={[
          styles.tabTitle,
          { color: selectedIndex === 1 ? 'rgb(7,94,85)' : '#8c8c8c' },
        ]}
      >
        <Layout>
          <ScrollView style={{ height: height * 0.85 }}>
            {update.map((data, index) => (
              <Item data={data} key={index} />
            ))}
          </ScrollView>
        </Layout>
      </Tab>
    </TabView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  selectedTab: {
    backgroundColor: 'rgb(7,94,85)',
  },
  tabTitle: {
    marginVertical: 10,
  },
  item: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

export default NotificationScreen;
