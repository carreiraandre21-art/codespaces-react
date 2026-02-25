import React, { useEffect, useState } from 'react';
import { Text, FlatList } from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function AbsencesScreen() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (!token) return;
    api.get('/students/1/full', { headers: { Authorization: `Bearer ${token}` } }).then((r) => setItems(r.data.absences));
  }, [token]);
  return <FlatList data={items} keyExtractor={(i) => String(i.id)} renderItem={({ item }) => <Text>{new Date(item.date).toLocaleDateString()} - {item.subject.name}</Text>} contentContainerStyle={{ padding: 16, gap: 8 }} />;
}
