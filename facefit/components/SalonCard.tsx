import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width: SW } = Dimensions.get('window');
const scale = (s: number) => Math.round((SW / 390) * s);

interface SalonCardProps {
  name: string;
  address: string;
  rating: number;
  distance: string;
  onBook?: () => void;
}

export default function SalonCard({ name, address, rating, distance, onBook }: SalonCardProps) {
  const stars = '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));

  return (
    <View style={styles.card}>
      {/* Icon */}
      <View style={styles.iconBox}>
        <Text style={styles.icon}>💈</Text>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.address} numberOfLines={1}>{address}</Text>
        <View style={styles.meta}>
          <Text style={styles.stars}>{stars}</Text>
          <Text style={styles.distance}> · {distance}</Text>
        </View>
      </View>

      {/* Book button */}
      <TouchableOpacity style={styles.bookBtn} onPress={onBook} activeOpacity={0.8}>
        <Text style={styles.bookLabel}>Book</Text>
      </TouchableOpacity>
    </View>
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
  iconBox: {
    width: scale(50),
    height: scale(50),
    backgroundColor: '#0F172A',
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: '#1E3A5F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: scale(26) },
  info: { flex: 1 },
  name: { color: '#F0F6FF', fontWeight: '700', fontSize: scale(14), marginBottom: scale(2) },
  address: { color: '#64748B', fontSize: scale(12), marginBottom: scale(4) },
  meta: { flexDirection: 'row', alignItems: 'center' },
  stars: { color: '#F59E0B', fontSize: scale(12) },
  distance: { color: '#64748B', fontSize: scale(12) },
  bookBtn: {
    backgroundColor: '#1D4ED8',
    borderRadius: scale(8),
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
  },
  bookLabel: { color: '#fff', fontWeight: '700', fontSize: scale(13) },
});