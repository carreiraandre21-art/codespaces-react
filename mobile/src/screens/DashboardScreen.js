import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { io } from 'socket.io-client';
import { api, API_HOST } from '../api/client';
import InfoCard from '../components/ui/InfoCard';
import { useAuth } from '../context/AuthContext';

export default function DashboardScreen() {
  const { token } = useAuth();
  const [summary, setSummary] = useState({
    faltasMes: 0,
    mediaGeral: 0,
    proximasProvas: [],
    atividadesPendentes: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchSummary = async () => {
      try {
        const res = await api.get('/students/3/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();

    const socket = io(API_HOST, { auth: { token } });
    socket.on('notification:new', fetchSummary);

    return () => socket.disconnect();
  }, [token]);

  const cards = useMemo(
    () => [
      { label: 'Faltas do mês', value: summary.faltasMes },
      { label: 'Média geral', value: summary.mediaGeral },
      { label: 'Próximas provas', value: summary.proximasProvas.length },
      { label: 'Atividades pendentes', value: summary.atividadesPendentes.length },
    ],
    [summary],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PAIEN COC JEAN PIAGE </Text>
      <Text style={styles.subtitle}>Visão rápida dos principais indicadores escolares.</Text>

      {loading ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" color="#1e3a8a" />
          <Text style={styles.loadingText}>Carregando seu painel...</Text>
        </View>
      ) : (
        <View style={styles.cardsGrid}>
          {cards.map((card) => (
            <InfoCard key={card.label}>
              <Text style={styles.cardLabel}>{card.label}</Text>
              <Text style={styles.cardValue}>{card.value}</Text>
            </InfoCard>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1eff00',
  },
  subtitle: {
    color: '#475569',
    marginBottom: 12,
  },
  cardsGrid: {
    gap: 12,
  },
  cardLabel: {
    color: '#475569',
    fontSize: 14,
  },
  cardValue: {
    fontSize: 30,
    color: '#1e3a8a',
    fontWeight: '800',
  },
  loadingWrapper: {
    marginTop: 22,
    alignItems: 'center',
    gap: 10,
  },
  loadingText: {
    color: '#475569',
  },
});
