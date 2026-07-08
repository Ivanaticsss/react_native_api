import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import axiosInstance from '../../api/axiosConfig';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Missing fields', 'Please fill out all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post('/register', {
        name,
        email,
        password,
      });

      if (response.data.success) {
        Alert.alert('Success', 'Account created. You can now log in.', [
          { text: 'OK', onPress: () => router.replace('/(auth)/login') },
        ]);
      } else {
        Alert.alert('Registration failed', response.data.message || 'Please try again.');
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'Something went wrong. Please try again.';
      Alert.alert('Registration failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.registerButtonText}>Register</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => router.replace('/(auth)/login')}
      >
        <Text style={styles.loginLinkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 32,
    textAlign: 'center',
    color: '#222',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    marginTop: 18,
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
  },
});