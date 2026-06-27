import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  ScrollView, Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
// login.tsx and register.tsx
import InputField from '@/components/ui/InputField';
import AppButton from '@/components/ui/AppButton';
import Header from '@/components/ui/Header';

const { width: SW } = Dimensions.get('window');
const scale = (s: number) => Math.round((SW / 390) * s);

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)/home');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* Logo */}
        <View style={styles.logoArea}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>✂️</Text>
          </View>
          <Text style={styles.appName}>FACE-FIT</Text>
          <Text style={styles.tagline}>AI-Based Haircut Recommendations</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>Welcome Back</Text>
          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
          />
          <InputField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />
          <View style={{ height: scale(8) }} />
          <AppButton label="Log In" onPress={handleLogin} loading={loading} />
          <View style={{ height: scale(12) }} />
          <AppButton
            label="Create an Account"
            onPress={() => router.push('/register' as any)}
            variant="outline"
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0A0F1E' },
  scroll: { flexGrow: 1, padding: scale(24), justifyContent: 'center' },
  logoArea: { alignItems: 'center', marginBottom: scale(36) },
  logoCircle: {
    width: scale(80), height: scale(80),
    backgroundColor: '#1D4ED8',
    borderRadius: scale(40),
    alignItems: 'center', justifyContent: 'center',
    marginBottom: scale(12),
    borderWidth: 2, borderColor: '#3B82F6',
  },
  logoEmoji: { fontSize: scale(36) },
  appName: { color: '#F0F6FF', fontSize: scale(28), fontWeight: '900', letterSpacing: 2 },
  tagline: { color: '#475569', fontSize: scale(12), marginTop: scale(4) },
  form: {
    backgroundColor: '#111827',
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: '#1E3A5F',
    padding: scale(20),
  },
  formTitle: { color: '#F0F6FF', fontSize: scale(18), fontWeight: '800', marginBottom: scale(20) },
});