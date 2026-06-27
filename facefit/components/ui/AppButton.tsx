import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

const { width: SW } = Dimensions.get('window');
const scale = (s: number) => Math.round((SW / 390) * s);

type Variant = 'primary' | 'secondary' | 'outline' | 'danger';

interface AppButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

const BG: Record<Variant, string> = {
  primary:   '#2563EB',
  secondary: '#1E3A5F',
  outline:   'transparent',
  danger:    '#DC2626',
};

const BORDER: Record<Variant, string> = {
  primary:   '#2563EB',
  secondary: '#1E3A5F',
  outline:   '#2563EB',
  danger:    '#DC2626',
};

export default function AppButton({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = true,
}: AppButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        { backgroundColor: BG[variant], borderColor: BORDER[variant] },
        fullWidth && { width: '100%' },
        disabled && { opacity: 0.5 },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: scale(12),
    borderWidth: 1.5,
    paddingVertical: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#fff',
    fontSize: scale(15),
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});