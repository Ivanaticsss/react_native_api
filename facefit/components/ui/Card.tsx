import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width: SW } = Dimensions.get('window');
const scale = (s: number) => Math.round((SW / 390) * s);

interface CardProps {
  children: React.ReactNode;
  style?: object;
}

export default function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111827',
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: '#1E3A5F',
    padding: scale(16),
    marginVertical: scale(8),
  },
});