import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import InputField from '@/components/ui/InputField';
import AppButton from '@/components/ui/AppButton';
import Header from '@/components/ui/Header';

const { width: SW } = Dimensions.get('window');
const scale = (s: number) => Math.round((SW / 390) * s);

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)/home');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Header title="Create Account" onBack={() => router.back()} />

        <View style={styles.form}>
          <InputField label="Full Name" value={name} onChangeText={setName} placeholder="Juan dela Cruz" />
          <InputField label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" />
          <InputField label="Password" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />
          <View style={{ height: scale(8) }} />
          <AppButton label="Register" onPress={handleRegister} loading={loading} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0A0F1E' },
  scroll: { flexGrow: 1, padding: scale(24) },
  form: {
    backgroundColor: '#111827',
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: '#1E3A5F',
    padding: scale(20),
  },
});