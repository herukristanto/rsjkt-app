import React from 'react';
import { Layout, Text, Avatar } from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import openMap from 'react-native-open-maps';

const LokasiScreen = () => {
  const mapRegion = {
    latitude: -6.2184,
    longitude: 106.8161,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const markerCoordinates = {
    latitude: -6.2184,
    longitude: 106.8161,
  };

  const handleDirection = () => {
    openMap({
      provider: 'google',
      end: 'Rumah Sakit Jakarta',
    });
  };

  return (
    <Layout style={styles.screen}>
      <TouchableOpacity style={styles.mapContainer} onPress={handleDirection}>
        <MapView region={mapRegion} style={styles.map}>
          <Marker
            title='Rumah Sakit Jakarta'
            coordinate={markerCoordinates}
          ></Marker>
        </MapView>
      </TouchableOpacity>
      <Text style={{ fontSize: 12 }}>
        Klik Maps untuk diarahkan ke RS Jakarta
      </Text>

      <Layout style={styles.descContainer}>
        <Layout style={styles.desc}>
          <Avatar
            style={styles.avatar}
            source={require('../assets/icon/alamat.png')}
          />
          <Layout style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Alamat</Text>
            <Text>
              Jl. Garnisun No. 1, Jendral Sudirman, Jakarta Selatan 12190
            </Text>
          </Layout>
        </Layout>
        <Layout style={styles.desc}>
          <Avatar
            style={styles.avatar}
            source={require('../assets/icon/informasi.png')}
          />
          <Layout style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Informasi</Text>
            <Text>021-5732241</Text>
          </Layout>
        </Layout>
        <Layout style={styles.desc}>
          <Avatar
            style={styles.avatar}
            source={require('../assets/icon/status.png')}
          />
          <Layout style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Email</Text>
            <Text>Customer.relation@rsjakarta.co.id</Text>
            <Text>Marketing@rsjakarta.co.id</Text>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  mapContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
    marginVertical: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  descContainer: {
    width: '90%',
    marginTop: 20,
  },
  desc: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  avatar: {
    alignSelf: 'center',
    marginRight: 10,
  },
  text: {
    width: '85%',
  },
});

export default LokasiScreen;
