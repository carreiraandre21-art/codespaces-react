import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import AppButton from '../components/ui/AppButton';
import InfoCard from '../components/ui/InfoCard';

export default function AbsencesScreen() {
  const { token, user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const canEdit = useMemo(() => ['TEACHER', 'ADMIN'].includes(user?.role), [user?.role]);
  const studentId = 3;

  const loadAbsences = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await api.get(`/students/${studentId}/full`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(Array.isArray(response.data?.absences) ? response.data.absences : []);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const resolveSubjectId = useCallback(() => {
    return items[0]?.subjectId || items[0]?.subject?.id || 1;
  }, [items]);

  const registerAbsence = useCallback(
    async (reason) => {
      if (!canEdit) return;
      setSubmitting(true);
      try {
        await api.post(
          '/absences',
          {
            studentId,
            subjectId: resolveSubjectId(),
            date: new Date().toISOString(),
            reason,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        await loadAbsences();
      } catch (error) {
        Alert.alert('Erro', error.response?.data?.message || 'Não foi possível registrar falta.');
      } finally {
        setSubmitting(false);
      }
    },
    [canEdit, loadAbsences, resolveSubjectId, token],
  );

  useEffect(() => {
    loadAbsences();
  }, [loadAbsences]);

  return (
    <FlatList
      data={items}
      keyExtractor={(i) => String(i.id)}
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        <InfoCard title="Ações de faltas">
          <View style={styles.actions}>
            <AppButton
              title="Registrar falta"
              onPress={() => registerAbsence('Falta registrada em aula')}
              disabled={!canEdit}
              loading={submitting}
            />
            <AppButton
              title="Registrar com justificativa"
              variant="secondary"
              onPress={() => registerAbsence('Consulta médica')}
              disabled={!canEdit}
              loading={submitting}
            />
          </View>
          {!canEdit ? (
            <Text style={styles.helperText}>
              Somente Professor e Coordenação podem alterar faltas. Seu perfil está em modo visualização.
            </Text>
          ) : null}
          {loading ? <Text style={styles.helperText}>Carregando faltas...</Text> : null}
        </InfoCard>
      }
      renderItem={({ item }) => (
        <InfoCard>
          <Text style={styles.itemTitle}>{new Date(item.date).toLocaleDateString('pt-BR')}</Text>
          <Text style={styles.itemText}>Matéria: {item.subject?.name || 'Sem matéria'}</Text>
          <Text style={styles.itemText}>Motivo: {item.reason || 'Não informado'}</Text>
        </InfoCard>
      )}
      ListEmptyComponent={!loading ? <Text style={styles.emptyText}>Nenhuma falta registrada.</Text> : null}
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
