import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  ScrollView, Dimensions, TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import Card from '../../components/ui/Card';
import AppButton from '../../components/ui/AppButton';

const { width: SW } = Dimensions.get('window');
const scale  = (s: number) => Math.round((SW / 390) * s);
const vscale = (s: number) => Math.round((SW / 390) * s);

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Top bar */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>Hello 👋</Text>
            <Text style={styles.subGreeting}>Find your perfect haircut</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile')} style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Text style={styles.heroEmoji}>✂️</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>Scan Your Face</Text>
            <Text style={styles.heroSub}>Get AI-powered haircut recommendations based on your face shape</Text>
          </View>
        </View>
        <AppButton label="Start Face Scan →" onPress={() => router.push('/(tabs)/scan')} />

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickRow}>
          <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/(tabs)/recommendations')}>
            <Text style={styles.quickIcon}>💇</Text>
            <Text style={styles.quickLabel}>My Results</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/(tabs)/salons')}>
            <Text style={styles.quickIcon}>💈</Text>
            <Text style={styles.quickLabel}>Find Salons</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/(tabs)/profile')}>
            <Text style={styles.quickIcon}>📅</Text>
            <Text style={styles.quickLabel}>Bookings</Text>
          </TouchableOpacity>
        </View>

        {/* Face Shape Guide */}
        <Text style={styles.sectionTitle}>Face Shape Guide</Text>
        {['Oval', 'Round', 'Square', 'Heart', 'Oblong'].map((shape) => (
          <Card key={shape} style={styles.guideCard}>
            <Text style={styles.guideName}>{shape}</Text>
            <Text style={styles.guideDesc}>{GUIDE[shape]}</Text>
          </Card>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const GUIDE: Record<string, string> = {
  Oval:   'Balanced proportions — most hairstyles work well.',
  Round:  'Soft curves — angular styles add definition.',
  Square: 'Strong jawline — soft layers balance features.',
  Heart:  'Wide forehead, narrow chin — side-swept styles work great.',
  Oblong: 'Long face — volume on the sides adds balance.',
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0A0F1E' },
  scroll: { padding: scale(20), paddingBottom: scale(40) },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: scale(20),
  },
  greeting: { color: '#F0F6FF', fontSize: scale(20), fontWeight: '900' },
  subGreeting: { color: '#475569', fontSize: scale(13), marginTop: scale(2) },
  avatar: {
    width: scale(42), height: scale(42),
    backgroundColor: '#1D4ED8', borderRadius: scale(21),
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: '#3B82F6',
  },
  avatarText: { fontSize: scale(20) },
  heroBanner: {
    backgroundColor: '#1D4ED8',
    borderRadius: scale(16),
    padding: scale(18),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(14),
    marginBottom: scale(12),
    borderWidth: 1, borderColor: '#3B82F6',
  },
  heroEmoji: { fontSize: scale(40) },
  heroTitle: { color: '#fff', fontSize: scale(16), fontWeight: '800', marginBottom: scale(4) },
  heroSub: { color: '#BFDBFE', fontSize: scale(12), lineHeight: scale(18) },
  sectionTitle: {
    color: '#94A3B8', fontSize: scale(12), fontWeight: '700',
    letterSpacing: 1, marginTop: scale(24), marginBottom: scale(10),
  },
  quickRow: { flexDirection: 'row', gap: scale(10) },
  quickCard: {
    flex: 1, backgroundColor: '#111827',
    borderRadius: scale(14), borderWidth: 1, borderColor: '#1E3A5F',
    padding: scale(14), alignItems: 'center', gap: scale(6),
  },
  quickIcon: { fontSize: scale(28) },
  quickLabel: { color: '#94A3B8', fontSize: scale(11), fontWeight: '600', textAlign: 'center' },
  guideCard: { marginVertical: scale(4) },
  guideName: { color: '#60A5FA', fontWeight: '700', fontSize: scale(14), marginBottom: scale(4) },
  guideDesc: { color: '#94A3B8', fontSize: scale(13), lineHeight: scale(19) },
});