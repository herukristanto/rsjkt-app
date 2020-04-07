import React, { useMemo, useContext } from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  View,
  AsyncStorage,
  Alert,
} from 'react-native';
import { Text, Icon, useTheme } from '@ui-kitten/components';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '../context/AppContext';
import { LOGOUT } from '../reducer/AppReducer';

const { width, height } = Dimensions.get('screen');

const images = [
  require('../assets/images/rs1.jpg'),
  require('../assets/images/rs2.png'),
  require('../assets/images/rs3.jpg'),
];

const HomeScreen = (props) => {
  const { navigation } = props;
  const { state, dispatch } = useContext(AppContext);

  const theme = useTheme();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('_USERDATA_');
    dispatch({ type: LOGOUT });
  };

  const handlePoli = () => {
    if (state.isLogin) {
      navigation.navigate('RegistrasiPoliklinik');
    } else {
      Alert.alert(
        'Peringatan',
        'Anda Harus Login Terlebih Dahulu Untuk Registrasi Poli',
        [{ text: 'Oke' }]
      );
    }
  };

  const styl = useMemo(
    () =>
      StyleSheet.create({
        screen: {
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          paddingVertical: Constants.statusBarHeight,
        },
        title: {
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        buttonContainer: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        },
        button: {
          alignItems: 'center',
          width: width * 0.4,
          backgroundColor: theme['color-basic-200'],
          borderColor: 'gray',
          borderWidth: 1,
          marginVertical: 15,
          borderRadius: 10,
          paddingVertical: 8,
          elevation: 10,
        },
        buttonText: {
          textAlign: 'center',
          color: 'black',
        },
      }),
    []
  );

  const linearColors = [theme['color-success-700'], theme['color-success-700']];

  return (
    <>
      <LinearGradient colors={linearColors} style={styl.screen}>
        <View style={styl.title}>
          <Image
            source={require('../assets/images/login-image.png')}
            style={{ width: width * 0.15, height: width * 0.15 }}
          />
          <Text
            category='h2'
            numberOfLines={2}
            style={{ textAlign: 'center', marginLeft: 8 }}
          >
            RS Jakarta Mobile
          </Text>
        </View>

        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            borderRadius: 10,
            overflow: 'hidden',
          }}
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          snapToAlignment='center'
          data={images}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => (
            <Image
              source={item}
              resizeMode='contain'
              style={{
                width,
                height: height / 3,
                borderRadius: 10,
              }}
            />
          )}
        />

        <View style={styl.buttonContainer}>
          {!state.isLogin && (
            <TouchableOpacity
              style={styl.button}
              onPress={() => navigation.navigate('Register')}
            >
              <Icon name='log-in-outline' width={64} height={64} fill='green' />
              <Text style={styl.buttonText} category='h6' category='h6'>
                Registrasi Akun
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styl.button} onPress={handlePoli}>
            <Icon name='log-in-outline' width={64} height={64} fill='green' />
            <Text style={styl.buttonText} category='h6'>
              Registrasi Poli
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styl.button} onPress={() => {}}>
            <Icon name='bookmark' width={64} height={64} fill='green' />
            <Text style={styl.buttonText} category='h6'>
              Cek Booking
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styl.button} onPress={() => {}}>
            <Icon name='pin' width={64} height={64} fill='green' />
            <Text style={styl.buttonText} category='h6'>
              Lokasi
            </Text>
          </TouchableOpacity>
          {!state.isLogin && (
            <>
              <TouchableOpacity
                style={styl.button}
                onPress={() => navigation.navigate('Login')}
              >
                <Icon
                  name='log-in-outline'
                  width={64}
                  height={64}
                  fill='green'
                />
                <Text style={styl.buttonText} category='h6'>
                  Login Pasien
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styl.button}
                onPress={() => navigation.navigate('LoginDokter')}
              >
                <Icon
                  name='log-in-outline'
                  width={64}
                  height={64}
                  fill='green'
                />
                <Text style={styl.buttonText} category='h6'>
                  Login Dokter
                </Text>
              </TouchableOpacity>
            </>
          )}
          {state.isLogin && (
            <TouchableOpacity style={styl.button} onPress={handleLogout}>
              <Icon
                name='log-out-outline'
                width={64}
                height={64}
                fill='green'
              />
              <Text style={styl.buttonText} category='h6'>
                Logout
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </>
  );
};

export default HomeScreen;
