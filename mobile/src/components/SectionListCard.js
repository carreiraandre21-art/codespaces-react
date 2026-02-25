import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SectionListCard({ title, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 12 },
  title: { fontWeight: '700', marginBottom: 8 }
});
