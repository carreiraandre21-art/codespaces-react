import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import AppButton from '../components/ui/AppButton';
import InfoCard from '../components/ui/InfoCard';

export default function GradesScreen() {
  const { token, user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const canEdit = useMemo(() => ['TEACHER', 'ADMIN'].includes(user?.role), [user?.role]);
  const studentId = 3;

  const loadGrades = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await api.get(`/students/${studentId}/full`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(Array.isArray(response.data?.grades) ? response.data.grades : []);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const resolveSubjectId = useCallback(() => {
    return items[0]?.subjectId || items[0]?.subject?.id || 1;
  }, [items]);

  const resolveExamId = useCallback(() => {
    return items[0]?.examId || items[0]?.exam?.id;
  }, [items]);

  const registerGrade = useCallback(
    async (value) => {
      if (!canEdit) return;
      setSubmitting(true);
      try {
        await api.post(
          '/grades',
          {
            studentId,
            subjectId: resolveSubjectId(),
            examId: resolveExamId(),
            value,
            term: '1º Bimestre',
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        await loadGrades();
      } catch (error) {
        Alert.alert('Erro', error.response?.data?.message || 'Não foi possível lançar nota.');
      } finally {
        setSubmitting(false);
      }
    },
    [canEdit, loadGrades, resolveExamId, resolveSubjectId, token],
  );

  useEffect(() => {
    loadGrades();
  }, [loadGrades]);

  return (
    <FlatList
      data={items}
      keyExtractor={(i) => String(i.id)}
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        <InfoCard title="Ações de notas">
          <View style={styles.actions}>
            <AppButton
              title="Lançar nota 8.0"
              onPress={() => registerGrade(8)}
              disabled={!canEdit}
              loading={submitting}
            />
            <AppButton
              title="Lançar nota 10.0"
              variant="secondary"
              onPress={() => registerGrade(10)}
              disabled={!canEdit}
              loading={submitting}
            />
          </View>
          {!canEdit ? (
            <Text style={styles.helperText}>
              Somente Professor e Coordenação podem alterar notas. Seu perfil está em modo visualização.
            </Text>
          ) : null}
          {loading ? <Text style={styles.helperText}>Carregando notas...</Text> : null}
        </InfoCard>
      }
      renderItem={({ item }) => (
        <InfoCard>
          <Text style={styles.itemTitle}>{item.subject?.name || 'Sem matéria'}</Text>
          <Text style={styles.itemText}>Nota: {item.value}</Text>
          <Text style={styles.itemText}>Período: {item.term || 'Não informado'}</Text>
        </InfoCard>
      )}
      ListEmptyComponent={!loading ? <Text style={styles.emptyText}>Nenhuma nota lançada.</Text> : null}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 10,
  },
  actions: {
    gap: 8,
  },
  helperText: {
    fontSize: 13,
    color: '#475569',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  itemText: {
    fontSize: 14,
    color: '#334155',
  },
  emptyText: {
    textAlign: 'center',
    color: '#64748b',
    marginTop: 24,
  },
});
