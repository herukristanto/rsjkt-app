import React from 'react';
import { Layout, Spinner } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const LoadingOverlay = () => {
  return (
    <Layout style={styles.loading}>
      <Spinner status='success' />
    </Layout>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
});

export default LoadingOverlay;
