import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('carlos@email.com');
  const [password, setPassword] = useState('123456');

  const onLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.message || 'Falha no login');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" autoCapitalize="none" />
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="Senha" />
      <Button title="Entrar" onPress={onLogin} />
      <Button title="Criar conta" onPress={() => navigation.navigate('Cadastro')} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16, gap: 12, justifyContent: 'center' }, input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 } });
