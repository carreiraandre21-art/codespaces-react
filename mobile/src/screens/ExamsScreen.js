import React, { useEffect, useState } from 'react';
import { Text, FlatList } from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function ExamsScreen() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (!token) return;
    api.get('/students/1/full', { headers: { Authorization: `Bearer ${token}` } }).then((r) => setItems(r.data.exams));
  }, [token]);
  return <FlatList data={items} keyExtractor={(i) => String(i.id)} renderItem={({ item }) => <Text>{item.title} - {new Date(item.date).toLocaleDateString()}</Text>} contentContainerStyle={{ padding: 16, gap: 8 }} />;
}
