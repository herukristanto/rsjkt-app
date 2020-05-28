import React, { useState, useEffect } from 'react';
import { Icon, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

const dummyData = [
  {
    judul: 'Poli: KMJA',
    isi:
      'Registrasi anda berhasil, silahkan scan qr-code berikut pada mesin antrian kami',
    tanggal: '2020-05-28',
    readed: 1,
    rm: 10,
    tipe: 'Registrasi',
  },
  {
    judul: 'Poli: Jantung',
    isi: 'Update jumlah antrian, anda memasukin antrian ke 3',
    tanggal: '2020-05-28',
    readed: 1,
    rm: 10,
    tipe: 'Antrian',
  },
  {
    judul: 'Poli: Jantung',
    isi: 'Terima kasih untuk kunjungan anda. Semoga sehat selalu',
    tanggal: '2020-05-28',
    readed: 1,
    rm: 10,
    tipe: 'Feedback',
  },
  {
    judul: 'Paket Screening covid19',
    isi:
      'Kini hadir di rs jakarta paket screening covid19. Diskon untuk 100 pasien pertama',
    tanggal: '2020-05-11',
    readed: 1,
    tipe: 'Promo',
  },
  {
    judul: 'Paket Check-up Lebaran',
    isi:
      'Pastikan kesehatan anda pada saat iedul fitri tiba, kami hadirkan paket khusus untuk anda',
    tanggal: '2020-05-21',
    readed: 0,
    tipe: 'Promo',
  },
];

const NotificationBell = () => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if any notification unreaded
    const notif = dummyData.find((n) => n.readed === 0);
    if (notif) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Notification', { data: dummyData })}
    >
      <View>
        <Icon style={{ width: 24, height: 24 }} fill='yellow' name='bell' />
        {show && <View style={styles.IconBadge}></View>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  IconBadge: {
    position: 'absolute',
    top: 1,
    right: 1,
    width: 10,
    height: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000',
  },
});

export default NotificationBell;
