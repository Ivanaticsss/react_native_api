import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  ScrollView, Dimensions, TouchableOpacity, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../components/ui/Header';
import AppButton from '../../components/ui/AppButton';

const { width: SW } = Dimensions.get('window');
const scale = (s: number) => Math.round((SW / 390) * s);

const MENU = [
  { icon: '📅', label: 'My Appointments' },
  { icon: '💇', label: 'Saved Hairstyles' },
  { icon: '⭐', label: 'My Reviews' },
  { icon: '🔔', label: 'Notifications' },
  { icon: '⚙️',  label: 'Settings' },
];

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Header title="My Profile" />

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <Text style={styles.userName}>Juan dela Cruz</Text>
          <Text style={styles.userEmail}>juan@example.com</Text>
          <View style={styles.faceShapeBadge}>
            <Text style={styles.faceShapeText}>✂️ Oval Face Shape</Text>
          </View>
        </View>

        {/* Menu */}
        {MENU.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.menuItem}
            onPress={() => Alert.alert(item.label, 'Coming soon!')}
            activeOpacity={0.8}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={{ height: scale(20) }} />
        <AppButton
          label="Log Out"
          onPress={() => router.replace('/' as any)}
          variant="danger"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0A0F1E' },
  scroll: { padding: scale(20), paddingBottom: scale(40) },
  avatarSection: {
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: '#1E3A5F',
    padding: scale(24),
    marginBottom: scale(20),
    gap: scale(6),
  },
  avatarCircle: {
    width: scale(72), height: scale(72),
    backgroundColor: '#1D4ED8',
    borderRadius: scale(36),
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#3B82F6',
    marginBottom: scale(6),
  },
  avatarEmoji: { fontSize: scale(34) },
  userName: { color: '#F0F6FF', fontSize: scale(18), fontWeight: '800' },
  userEmail: { color: '#475569', fontSize: scale(13) },
  faceShapeBadge: {
    backgroundColor: '#0F172A',
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: '#1E3A5F',
    paddingHorizontal: scale(12),
    paddingVertical: scale(4),
    marginTop: scale(4),
  },
  faceShapeText: { color: '#60A5FA', fontSize: scale(12), fontWeight: '600' },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: '#1E3A5F',
    padding: scale(14),
    marginBottom: scale(8),
    gap: scale(12),
  },
  menuIcon: { fontSize: scale(20) },
  menuLabel: { flex: 1, color: '#CBD5E1', fontSize: scale(14), fontWeight: '600' },
  menuArrow: { color: '#475569', fontSize: scale(20) },
});