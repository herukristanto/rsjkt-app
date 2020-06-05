import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Icon } from '@ui-kitten/components';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { baseAxios } from '../utils/useAxios';
import { AppContext } from '../context/AppContext';

const NotificationBell = () => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [notif, setNotif] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { state } = useContext(AppContext);

  useFocusEffect(
    useCallback(() => {
      const getNotif = async () => {
        try {
          setLoading(true);
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
          setLoading(false);
        } catch (error) {
          setLoading(true);
          setError(true);
        }
      };
      getNotif();
    }, [navigation])
  );

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Notification', { data: notif })}
      disabled={loading}
    >
      <View>
        <Icon
          style={{ width: 24, height: 24 }}
          fill={loading ? 'gray' : error ? 'red' : 'white'}
          name='bell'
        />
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
