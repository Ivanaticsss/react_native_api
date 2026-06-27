import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width: SW } = Dimensions.get('window');
const scale = (s: number) => Math.round((SW / 390) * s);

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

export default function Header({ title, onBack }: HeaderProps) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.backBtn} />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.backBtn} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(14),
    paddingHorizontal: scale(4),
    borderBottomWidth: 1,
    borderBottomColor: '#1E3A5F',
    marginBottom: scale(16),
  },
  backBtn: { width: scale(36), alignItems: 'center' },
  backIcon: { color: '#60A5FA', fontSize: scale(22), fontWeight: '700' },
  title: {
    color: '#F0F6FF',
    fontSize: scale(17),
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});