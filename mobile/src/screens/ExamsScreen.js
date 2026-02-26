import AsyncStorage from '../utils/asyncStorage';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { api } from '../api/client';
import InfoCard from '../components/ui/InfoCard';

const TOKEN_KEYS = ['token', 'authToken', '@token', '@authToken'];

const getExamDateLabel = (dateValue) => {
  if (!dateValue) return 'Data não informada';

  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) return 'Data inválida';

  return parsedDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const getExamSubject = (exam) => {
  return exam.subject?.name || exam.subjectName || exam.subject || 'Matéria não informada';
};

export default function ExamsScreen({ navigation }) {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchExams = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const tokenValues = await AsyncStorage.multiGet(TOKEN_KEYS);
      const token = tokenValues.find(([, value]) => Boolean(value))?.[1];

      if (!token) {
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        return;
      }

      const response = await api.get('/students/3/full', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Dados das Provas:', response.data);
      setExams(Array.isArray(response.data?.exams) ? response.data.exams : []);
    } catch (error) {
      console.error('Erro ao carregar provas:', error.response?.data || error.message);
      setExams([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [navigation]);

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <FlatList
      data={exams}
      keyExtractor={(item, index) => String(item.id ?? index)}
      contentContainerStyle={[
        styles.contentContainer,
        exams.length === 0 ? styles.emptyContentContainer : null,
      ]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => fetchExams(true)} tintColor="#2563eb" />
      }
      ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma prova encontrada</Text>}
      renderItem={({ item }) => (
        <InfoCard title={item.title || 'Prova sem título'}>
          <Text style={styles.infoText}>Data: {getExamDateLabel(item.date)}</Text>
          <Text style={styles.infoText}>Matéria: {getExamSubject(item)}</Text>
        </InfoCard>
      )}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    gap: 12,
  },
  emptyContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 15,
    color: '#334155',
  },
});
