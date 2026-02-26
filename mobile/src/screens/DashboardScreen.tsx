import React, { useCallback, useMemo, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from '../components/common/Card';
import { Skeleton } from '../components/common/Skeleton';
import { Badge } from '../components/common/Badge';
import { useTheme } from '../context/ThemeContext';

const mockChildren = ['Marina Souza', 'Lucas Souza'];

export default function DashboardScreen() {
  const { theme, toggle, dark } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedChild, setSelectedChild] = useState(mockChildren[0]);

  const stats = useMemo(
    () => [
      { label: 'Media geral', value: '8.7', trend: '+0.3' },
      { label: 'Faltas no mes', value: '2', trend: '+1' },
      { label: 'Proximas provas', value: '3', trend: '0' },
      { label: 'Atividades pendentes', value: '4', trend: '-2' }
    ],
    [],
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />}
    >
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: theme.text }]}>Bom dia, Carlos</Text>
          <Text style={[styles.subtitle, { color: theme.muted }]}>Acompanhe o desempenho escolar em tempo real.</Text>
        </View>
        <View style={styles.icons}>
          <Badge value={3} />
          <TouchableOpacity onPress={toggle}>
            <MaterialIcons name={dark ? 'light-mode' : 'dark-mode'} size={22} color={theme.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <Card>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Selecionar filho</Text>
        <View style={styles.row}>
          {mockChildren.map((child) => (
            <TouchableOpacity
              key={child}
              style={[styles.pill, { borderColor: selectedChild === child ? theme.primary : theme.border }]}
              onPress={() => setSelectedChild(child)}
            >
              <Text style={{ color: theme.text }}>{child}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      <View style={styles.grid}>
        {stats.map((s) => (
          <Card key={s.label}>
            <Text style={[styles.label, { color: theme.muted }]}>{s.label}</Text>
            <Text style={[styles.value, { color: theme.text }]}>{s.value}</Text>
            <Text style={[styles.trend, { color: s.trend.startsWith('+') ? '#D97706' : '#16A34A' }]}>{s.trend} vs mes anterior</Text>
          </Card>
        ))}
      </View>

      <Card>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Carregando modulos</Text>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  icons: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  title: { fontSize: 24, fontWeight: '800' },
  subtitle: { marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10 },
  row: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  pill: { borderWidth: 1, borderRadius: 99, paddingVertical: 8, paddingHorizontal: 12 },
  grid: { gap: 12 },
  label: { fontSize: 13 },
  value: { fontSize: 28, fontWeight: '800' },
  trend: { marginTop: 6, fontSize: 12 }
});
