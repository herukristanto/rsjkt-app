import React, { useState, useEffect, useContext } from 'react';
import { Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { baseAxios } from '../utils/useAxios';
import { AppContext } from '../context/AppContext';

const NotificationBell = () => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [notif, setNotif] = useState();
  const { state } = useContext(AppContext);

  useEffect(() => {
    const getNotif = async () => {
      try {
        // Notif Promo
        const { data: dataNotifPromo } = await baseAxios.get('/NotifPromo', {
          params: {
            key: 'rsjkt4231',
          },
        });
        let data = dataNotifPromo;

        if (state.isLogin && state.user.role === 'pasien') {
          // Notif Pasien
          const { data: dataNotifPasien } = await baseAxios.get(
            '/NotifPasien',
            {
              params: {
                key: 'rsjkt4231',
                rm: state.user.nomor_cm,
              },
            }
          );
          data = dataNotifPromo.concat(dataNotifPasien);
        }

        // Check if any notification unreaded
        const notif = data.find(
          (n) => n.IsRead === 0 && n.TypeNotif !== 'Promo'
        );
        if (notif) {
          setShow(true);
        } else {
          setShow(false);
        }
        setNotif(data);
      } catch (error) {
        console.log(error);
      }
    };
    getNotif();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Notification', { data: notif })}
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
