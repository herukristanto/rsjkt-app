import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Icon, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen');

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon style={{ width: 32, height: 32 }} fill='white' name='menu' />
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <Image
          source={require('../assets/images/login-image.png')}
          style={{ width: width * 0.09, height: width * 0.09 }}
        />
        <Text
          category='h6'
          numberOfLines={2}
          style={{ textAlign: 'center', marginLeft: 8, color: 'white' }}
        >
          RS Jakarta Mobile
        </Text>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => {}}>
          <Icon style={{ width: 24, height: 24 }} fill='yellow' name='bell' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgb(7,94,85)',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
