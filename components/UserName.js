import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

const UserName = ({ name, style }) => {
  return (
    <Layout style={[styles.container, { ...style }]}>
      <FontAwesome5 style={styles.icon} name='user-circle' solid size={20} />
      <Text>{name}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  icon: {
    marginRight: 5,
  },
});

export default UserName;
