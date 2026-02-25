import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function GradesScreen() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (!token) return;
    api.get('/students/1/full', { headers: { Authorization: `Bearer ${token}` } }).then((r) => setItems(r.data.grades));
  }, [token]);
  return <FlatList data={items} keyExtractor={(i) => String(i.id)} renderItem={({ item }) => <Text>{item.subject.name}: {item.value}</Text>} contentContainerStyle={{ padding: 16, gap: 8 }} />;
}
