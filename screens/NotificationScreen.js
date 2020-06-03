import React, { useState, useEffect, useContext } from 'react';
import { Layout, TabView, Tab, Text, Spinner } from '@ui-kitten/components';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import moment from 'moment';
import { AppContext } from '../context/AppContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import { baseAxios } from '../utils/useAxios';

const { height } = Dimensions.get('window');

const NotificationScreen = () => {
  const { state } = useContext(AppContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [transaksi, setTransaksi] = useState();
  const [update, setUpdate] = useState();
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    const getNotification = async () => {
      try {
        const data = route.params.data;

        const transaksiList = data.filter(
          (t) =>
            t.TypeNotif === 'Registrasi' ||
            t.TypeNotif === 'Antrian' ||
            t.TypeNotif === 'Feedback' ||
            t.TypeNotif === 'PasienBaru'
        );
        const updateList = data.filter((t) => t.TypeNotif === 'Promo');

        setTransaksi(transaksiList);
        setUpdate(updateList);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getNotification();
  }, []);

  const handleNotif = async (data) => {
    try {
      if (data.TypeNotif === 'Promo') {
        const { data: dataPromo } = await baseAxios.get('/get', {
          params: {
            p: 'promo',
          },
        });
        const promo = dataPromo.find((p) => p.id == data.IDPromo);
        navigation.navigate('Promo', { promo: promo });
      } else if (data.TypeNotif === 'Registrasi') {
        // Flag Notif
        const request = {
          key: 'rsjkt4231',
          id_notif: data.ID_Notif,
        };
        await baseAxios.put('IsReadNotif', request);

        const { data: dataPasien } = await baseAxios.get('/KdbookCek', {
          params: {
            kd_booking: data.KodeBooking,
          },
        });
        navigation.navigate('SingleBooking', { data: dataPasien.data });
      } else if (data.TypeNotif === 'PasienBaru') {
        // Flag Notif
        const request = {
          key: 'rsjkt4231',
          id_notif: data.ID_Notif,
        };
        await baseAxios.put('IsReadNotif', request);

        Alert.alert(
          'Congratulations',
          'Selamat Datang Di Rumah Sakit Jakarta Mobile'
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Something Wrong! Please contact customer service!');
      return;
    }
  };

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  const Item = ({ data }) => {
    return (
      <TouchableOpacity
        style={[
          styles.item,
          { backgroundColor: data.IsRead === 1 ? 'white' : '#d9d9d9' },
        ]}
        onPress={() => handleNotif(data)}
      >
        <Text>
          {data.TypeNotif} - {moment(data.Tanggal).format('DD MMMM Y')}
        </Text>
        <Text status='success' style={{ fontWeight: 'bold' }}>
          {data.JudulNotif}
        </Text>
        <Text>"{data.IsiNotif}"</Text>
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
