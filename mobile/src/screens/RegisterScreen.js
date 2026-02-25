import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { authApi } from '../api/client';

export default function RegisterScreen({ navigation }) {
  const [parentName, setParentName] = useState('Novo Responsável');
  const [email, setEmail] = useState('novo@email.com');
  const [password, setPassword] = useState('123456');
  const [phone, setPhone] = useState('11999990000');
  const [studentName, setStudentName] = useState('Novo Aluno');
  const [registration, setRegistration] = useState('2026999');

  const submit = async () => {
    try {
      await authApi.post('/register', {
        parent: { name: parentName, email, password, phone },
        student: { name: studentName, registration, birthDate: new Date('2012-01-01').toISOString(), classId: 1 }
      });
      Alert.alert('Sucesso', 'Cadastro realizado');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erro', e.response?.data?.message || 'Falha ao cadastrar');
    }
  };

  return (
    <View style={styles.container}>
      {[ [parentName,setParentName,'Nome Responsável'], [email,setEmail,'Email'], [password,setPassword,'Senha'], [phone,setPhone,'Telefone'], [studentName,setStudentName,'Nome Aluno'], [registration,setRegistration,'Matrícula']].map(([value,setter,ph]) => (
        <TextInput key={ph} style={styles.input} value={value} onChangeText={setter} placeholder={ph} secureTextEntry={ph==='Senha'} />
      ))}
      <Button title="Cadastrar" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16, gap: 10 }, input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 } });
