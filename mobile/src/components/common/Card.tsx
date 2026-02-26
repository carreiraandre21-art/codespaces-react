import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export const Card = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  }
});
