import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import GradesScreen from '../screens/GradesScreen';
import AbsencesScreen from '../screens/AbsencesScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import ExamsScreen from '../screens/ExamsScreen';
import OccurrencesScreen from '../screens/OccurrencesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Dashboard" component={DashboardScreen} />
      <Tabs.Screen name="Notas" component={GradesScreen} />
      <Tabs.Screen name="Faltas" component={AbsencesScreen} />
      <Tabs.Screen name="Atividades" component={ActivitiesScreen} />
      <Tabs.Screen name="Provas" component={ExamsScreen} />
      <Tabs.Screen name="Ocorrências" component={OccurrencesScreen} />
      <Tabs.Screen name="Perfil" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}

export default function RootNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen name="App" component={AppTabs} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
