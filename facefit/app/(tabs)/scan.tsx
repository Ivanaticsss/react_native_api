import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  ScrollView, Dimensions, Alert, ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import AppButton from '../../components/ui/AppButton';
import Header from '../../components/ui/Header';

const { width: SW } = Dimensions.get('window');
const scale = (s: number) => Math.round((SW / 390) * s);

const MOCK_RESULTS: Record<string, { shape: string; description: string; hairstyles: { name: string; match: number }[] }> = {
  oval:   { shape: 'Oval',   description: 'Balanced proportions — suits almost any hairstyle.', hairstyles: [{ name: 'Layered Cut', match: 95 }, { name: 'Side Swept Bangs', match: 88 }, { name: 'Curly Bob', match: 80 }, { name: 'Slick Back', match: 74 }] },
  round:  { shape: 'Round',  description: 'Soft curves with similar face width and length.',    hairstyles: [{ name: 'Pompadour', match: 92 }, { name: 'High Fade', match: 85 }, { name: 'Long Layers', match: 77 }, { name: 'Angular Fringe', match: 70 }] },
  square: { shape: 'Square', description: 'Strong jawline with equal forehead and jaw width.',  hairstyles: [{ name: 'Textured Quiff', match: 93 }, { name: 'Side Part', match: 86 }, { name: 'Soft Waves', match: 78 }, { name: 'Taper Fade', match: 71 }] },
  heart:  { shape: 'Heart',  description: 'Wider forehead tapering to a narrow chin.',          hairstyles: [{ name: 'Side-Swept Bangs', match: 91 }, { name: 'Chin-Length Bob', match: 84 }, { name: 'Loose Waves', match: 76 }, { name: 'Faux Hawk', match: 68 }] },
  oblong: { shape: 'Oblong', description: 'Longer face with similar forehead and jaw width.',   hairstyles: [{ name: 'Curtain Bangs', match: 90 }, { name: 'Buzz Cut', match: 83 }, { name: 'Voluminous Curls', match: 75 }, { name: 'Shag Cut', match: 67 }] },
};

export default function ScanScreen() {
  const router   = useRouter();
  const [scanning, setScanning] = useState(false);
  const [result, setResult]     = useState<null | typeof MOCK_RESULTS['oval']>(null);

  const handleScan = () => {
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      const keys   = Object.keys(MOCK_RESULTS);
      const random = keys[Math.floor(Math.random() * keys.length)];
      setResult(MOCK_RESULTS[random]);
      setScanning(false);
    }, 2500);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Header title="Face Scanner" />

        {/* Camera Box */}
        <View style={styles.cameraBox}>
          {scanning ? (
            <View style={styles.scanningOverlay}>
              <ActivityIndicator size="large" color="#2563EB" />
              <Text style={styles.scanningText}>Analyzing face shape…</Text>
              <View style={[styles.scanLine, { top: '30%' }]} />
              <View style={[styles.scanLine, { top: '60%' }]} />
            </View>
          ) : result ? (
            <View style={styles.resultOverlay}>
              <Text style={styles.resultEmoji}>✅</Text>
              <Text style={styles.resultShapeText}>{result.shape} Face</Text>
            </View>
          ) : (
            <>
              <Text style={styles.cameraIcon}>🤳</Text>
              <Text style={styles.cameraHint}>Position your face in the frame</Text>
            </>
          )}
          {/* Corner guides */}
          <View style={[styles.corner, styles.tl]} />
          <View style={[styles.corner, styles.tr]} />
          <View style={[styles.corner, styles.bl]} />
          <View style={[styles.corner, styles.br]} />
        </View>

        {/* Result card */}
        {result && (
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <View style={styles.shapeBadge}>
                <Text style={styles.shapeBadgeText}>{result.shape}</Text>
              </View>
              <Text style={styles.resultLabel}>Face Shape Detected</Text>
            </View>
            <Text style={styles.resultDesc}>{result.description}</Text>
          </View>
        )}

        {/* Buttons */}
        <View style={styles.actions}>
          <AppButton label={result ? '🔄  Scan Again' : '📷  Scan My Face'} onPress={handleScan} loading={scanning} />
          <View style={{ height: scale(10) }} />
          <AppButton label="📁  Upload Photo" onPress={() => Alert.alert('Upload', 'Camera roll picker goes here.')} variant="outline" />
          {result && (
            <>
              <View style={{ height: scale(10) }} />
              <AppButton
                label="View Recommendations →"
                onPress={() => router.push('/(tabs)/recommendations')}
                variant="secondary"
              />
            </>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0A0F1E' },
  scroll: { padding: scale(20), paddingBottom: scale(40) },
  cameraBox: {
    height: scale(300),
    backgroundColor: '#060D1A',
    borderRadius: scale(20),
    borderWidth: 1.5,
    borderColor: '#1E3A5F',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: scale(16),
    position: 'relative',
  },
  cameraIcon: { fontSize: scale(52), marginBottom: scale(10) },
  cameraHint: { color: '#475569', fontSize: scale(13) },
  scanningOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(6,13,26,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(12),
  },
  scanningText: { color: '#60A5FA', fontSize: scale(14), fontWeight: '600' },
  scanLine: {
    position: 'absolute', left: '10%', right: '10%',
    height: 1.5, backgroundColor: '#2563EB', opacity: 0.6,
  },
  resultOverlay: {
    alignItems: 'center', gap: scale(8),
  },
  resultEmoji: { fontSize: scale(40) },
  resultShapeText: { color: '#F0F6FF', fontSize: scale(18), fontWeight: '900' },
  corner: {
    position: 'absolute',
    width: scale(24), height: scale(24),
    borderColor: '#2563EB', borderWidth: 2.5,
  },
  tl: { top: scale(20),  left: scale(20),  borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 6 },
  tr: { top: scale(20),  right: scale(20), borderLeftWidth: 0,  borderBottomWidth: 0, borderTopRightRadius: 6 },
  bl: { bottom: scale(20), left: scale(20),  borderRightWidth: 0, borderTopWidth: 0,    borderBottomLeftRadius: 6 },
  br: { bottom: scale(20), right: scale(20), borderLeftWidth: 0,  borderTopWidth: 0,    borderBottomRightRadius: 6 },
  resultCard: {
    backgroundColor: '#111827',
    borderRadius: scale(14),
    borderWidth: 1,
    borderColor: '#1E3A5F',
    padding: scale(16),
    marginBottom: scale(16),
  },
  resultHeader: { flexDirection: 'row', alignItems: 'center', gap: scale(10), marginBottom: scale(8) },
  shapeBadge: {
    backgroundColor: '#1D4ED8', borderRadius: scale(8),
    paddingHorizontal: scale(12), paddingVertical: scale(4),
  },
  shapeBadgeText: { color: '#BFDBFE', fontWeight: '800', fontSize: scale(13) },
  resultLabel: { color: '#94A3B8', fontSize: scale(13) },
  resultDesc: { color: '#CBD5E1', fontSize: scale(13), lineHeight: scale(20) },
  actions: {},
});