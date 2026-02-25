import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
}) {
  const isSecondary = variant === 'secondary';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        isSecondary ? styles.secondaryButton : styles.primaryButton,
        (disabled || loading) && styles.buttonDisabled,
        pressed && !disabled && !loading && styles.buttonPressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isSecondary ? '#1e3a8a' : '#ffffff'} />
      ) : (
        <Text style={[styles.label, isSecondary ? styles.secondaryLabel : styles.primaryLabel]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: '#1e3a8a',
  },
  secondaryButton: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
  primaryLabel: {
    color: '#ffffff',
  },
  secondaryLabel: {
    color: '#1e3a8a',
  },
});
