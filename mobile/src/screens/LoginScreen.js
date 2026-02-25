import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/ui/AppButton';
import AppInput from '../components/ui/AppInput';
import InfoCard from '../components/ui/InfoCard';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('carlos@email.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const canSubmit = useMemo(() => Boolean(email.trim() && password.trim()), [email, password]);

  const onLogin = async () => {
    if (!canSubmit) {
      setErrorMessage('Preencha email e senha para continuar.');
      return;
    }

    setErrorMessage('');
    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          'Não foi possível entrar agora. Confira seus dados e tente novamente.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={styles.safeArea}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>ConectaEscola</Text>
          <Text style={styles.subtitle}>Acesso seguro para acompanhar a rotina escolar.</Text>
        </View>

        <InfoCard>
          <AppInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="seuemail@escola.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <AppInput
            label="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Digite sua senha"
          />

          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

          <View style={styles.buttonGroup}>
            <AppButton title="Entrar" onPress={onLogin} loading={loading} disabled={!canSubmit} />
            <AppButton
              title="Criar conta"
              variant="secondary"
              onPress={() => navigation.navigate('Cadastro')}
              disabled={loading}
            />
          </View>
        </InfoCard>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 20,
  },
  header: {
    gap: 6,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#1e3a8a',
  },
  subtitle: {
    color: '#475569',
    fontSize: 16,
    lineHeight: 22,
  },
  errorMessage: {
    borderRadius: 10,
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#fecaca',
    color: '#b91c1c',
    fontSize: 13,
    padding: 10,
  },
  buttonGroup: {
    gap: 10,
    marginTop: 6,
  },
});
