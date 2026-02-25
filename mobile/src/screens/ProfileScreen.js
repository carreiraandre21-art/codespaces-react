import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  return (
    <View style={{ flex: 1, padding: 16, gap: 10 }}>
      <Text>Nome: {user?.name}</Text>
      <Text>Email: {user?.email}</Text>
      <Text>Perfil: {user?.role}</Text>
      <Button title="Sair" onPress={logout} />
    </View>
  );
}
