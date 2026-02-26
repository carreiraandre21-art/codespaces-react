import React from 'react';
import { StyleSheet, View } from 'react-native';

export const Skeleton = () => <View style={styles.skeleton} />;

const styles = StyleSheet.create({
  skeleton: {
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
    marginBottom: 8
  }
});
