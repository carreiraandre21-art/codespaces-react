import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { io } from 'socket.io-client';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function DashboardScreen() {
  const { token } = useAuth();
  const [summary, setSummary] = useState({ faltasMes: 0, mediaGeral: 0, proximasProvas: [], atividadesPendentes: [] });

  useEffect(() => {
    if (!token) return;
    api.get('/students/1/dashboard', { headers: { Authorization: `Bearer ${token}` } }).then((res) => setSummary(res.data));
    const socket = io('http://localhost:4000', { auth: { token } });
    socket.on('notification:new', () => {
      api.get('/students/1/dashboard', { headers: { Authorization: `Bearer ${token}` } }).then((res) => setSummary(res.data));
    });
    return () => socket.disconnect();
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo</Text>
      <Text>Faltas do mês: {summary.faltasMes}</Text>
      <Text>Média geral: {summary.mediaGeral}</Text>
      <Text>Próximas provas: {summary.proximasProvas.length}</Text>
      <Text>Atividades pendentes: {summary.atividadesPendentes.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16, gap: 8 }, title: { fontSize: 22, fontWeight: '700' } });
