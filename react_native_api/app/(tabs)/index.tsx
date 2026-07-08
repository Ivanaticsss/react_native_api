import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../api/axiosConfig';

type UserRow = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [currentUserName, setCurrentUserName] = useState('');
  const [users, setUsers] = useState<UserRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadCurrentUser = async () => {
    const stored = await AsyncStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setCurrentUserName(parsed.name);
    } else {
      router.replace('/(auth)/login');
    }
  };

  const loadUsers = async () => {
    try {
      const response = await axiosInstance.get('/users');
      if (response.data.success) {
        setUsers(response.data.users);
        setTotal(response.data.total);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not load registered users.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCurrentUser();
      loadUsers();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadUsers();
  };

  const handleLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('user');
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText} numberOfLines={1}>
          Welcome {currentUserName}
        </Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.counterCard}>
        <Text style={styles.counterLabel}>Total Registered Member</Text>
        <Text style={styles.counterValue}>{total}</Text>
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, { flex: 0.5 }]}>ID</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1.2 }]}>Name</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Email</Text>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 24 }} size="large" color="#2563eb" />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => String(item.id)}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 0.5 }]}>{item.id}</Text>
              <Text style={[styles.tableCell, { flex: 1.2 }]}>{item.name}</Text>
              <Text style={[styles.tableCell, { flex: 1.5 }]} numberOfLines={1}>
                {item.email}
              </Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No registered users yet.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  welcomeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    flexShrink: 1,
    marginLeft: 12,
  },
  counterCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  counterLabel: {
    fontSize: 13,
    color: '#1e40af',
    fontWeight: '500',
    marginBottom: 6,
  },
  counterValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1e3a8a',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  tableHeaderCell: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tableCell: {
    fontSize: 13,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 24,
    color: '#999',
  },
});