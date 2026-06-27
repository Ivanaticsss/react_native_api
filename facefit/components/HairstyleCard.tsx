import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width: SW } = Dimensions.get('window');
const scale = (s: number) => Math.round((SW / 390) * s);

interface HairstyleCardProps {
  rank: number;
  name: string;
  match: number; // percentage
  onPress?: () => void;
}

export default function HairstyleCard({ rank, name, match, onPress }: HairstyleCardProps) {
  const matchColor = match >= 80 ? '#22C55E' : match >= 60 ? '#F59E0B' : '#94A3B8';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Rank */}
      <View style={styles.rankBox}>
        <Text style={styles.rankText}>#{rank}</Text>
      </View>

      {/* Image placeholder */}
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imageIcon}>✂️</Text>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.matchRow}>
          <View style={[styles.matchDot, { backgroundColor: matchColor }]} />
          <Text style={[styles.matchText, { color: matchColor }]}>{match}% match</Text>
        </View>
        {/* Match bar */}
        <View style={styles.barBg}>
          <View style={[styles.barFill, { width: `${match}%` as any, backgroundColor: matchColor }]} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: scale(14),
    borderWidth: 1,
    borderColor: '#1E3A5F',
    padding: scale(12),
    marginBottom: scale(10),
    gap: scale(12),
  },
  rankBox: {
    width: scale(28),
    alignItems: 'center',
  },
  rankText: { color: '#3B82F6', fontWeight: '900', fontSize: scale(14) },
  imagePlaceholder: {
    width: scale(56),
    height: scale(56),
    backgroundColor: '#0F172A',
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: '#1E3A5F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIcon: { fontSize: scale(26) },
  info: { flex: 1 },
  name: { color: '#F0F6FF', fontWeight: '700', fontSize: scale(14), marginBottom: scale(4) },
  matchRow: { flexDirection: 'row', alignItems: 'center', gap: scale(5), marginBottom: scale(5) },
  matchDot: { width: scale(7), height: scale(7), borderRadius: 10 },
  matchText: { fontSize: scale(12), fontWeight: '600' },
  barBg: { height: scale(4), backgroundColor: '#1E3A5F', borderRadius: 10 },
  barFill: { height: scale(4), borderRadius: 10 },
});