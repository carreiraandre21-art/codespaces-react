import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Badge = ({ value }: { value: number }) => {
  if (!value) return null;
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6
  },
  text: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 11
  }
});
