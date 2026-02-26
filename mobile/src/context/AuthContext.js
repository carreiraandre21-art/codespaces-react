import React, { createContext, useContext, useMemo, useState } from 'react';
import { authApi } from '../api/client';
import AsyncStorage from '../utils/asyncStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    const { data } = await authApi.post('/login', { email, password });
    setUser(data.user);
    setToken(data.token);

    await AsyncStorage.setItem('token', data.token);

    return data;
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('token');
  };

  const value = useMemo(() => ({ user, token, login, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
