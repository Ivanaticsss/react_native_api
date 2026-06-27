import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, ActivityIndicator,
} from 'react-native';
import AppButton from './ui/AppButton';
import Card from './ui/Card';

const { width: SW } = Dimensions.get('window');
const scale  = (s: number) => Math.round((SW / 390) * s);
const vscale = (s: number) => Math.round((SW / 390) * s);

// Mock face shape results (replace with real AI model later)
const MOCK_RESULTS: Record<string, { shape: string; description: string; hairstyles: string[] }> = {
  oval:    { shape: 'Oval',    description: 'Balanced proportions — suits almost any hairstyle.', hairstyles: ['Layered Cut', 'Side Swept Bangs', 'Curly Bob', 'Slick Back'] },
  round:   { shape: 'Round',   description: 'Soft curves with similar face width and length.', hairstyles: ['Pompadour', 'High Fade', 'Long Layers', 'Angular Fringe'] },
  square:  { shape: 'Square',  description: 'Strong jawline with equal forehead and jaw width.', hairstyles: ['Textured Quiff', 'Side Part', 'Soft Waves', 'Taper Fade'] },
  heart:   { shape: 'Heart',   description: 'Wider forehead tapering to a narrow chin.', hairstyles: ['Side-Swept Bangs', 'Chin-Length Bob', 'Loose Waves', 'Faux Hawk'] },
  oblong:  { shape: 'Oblong',  description: 'Longer face with similar forehead and jaw width.', hairstyles: ['Curtain Bangs', 'Buzz Cut', 'Voluminous Curls', 'Shag Cut'] },
};

const SHAPES = Object.keys(MOCK_RESULTS);

interface FaceScannerProps {
  onResult: (shape: string, hairstyles: string[]) => void;
}

export default function FaceScanner({ onResult }: FaceScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [result, setResult]   = useState<null | typeof MOCK_RESULTS['oval']>(null);

  const handleScan = () => {
    setScanning(true);
    setResult(null);
    // Simulate AI processing delay
    setTimeout(() => {
      const random = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const res = MOCK_RESULTS[random];
      setResult(res);
      setScanning(false);
      onResult(res.shape, res.hairstyles);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Camera preview placeholder */}
      <View style={styles.cameraBox}>
        {scanning ? (
          <View style={styles.scanningOverlay}>
            <ActivityIndicator size="large" color="#2563EB" />
            <Text style={styles.scanningText}>Analyzing face shape…</Text>
            {/* Scan lines effect */}
            <View style={[styles.scanLine, { top: '30%' }]} />
            <View style={[styles.scanLine, { top: '60%' }]} />
          </View>
        ) : (
          <>
            <Text style={styles.cameraIcon}>🤳</Text>
            <Text style={styles.cameraHint}>Position your face in the frame</Text>
            {/* Corner guides */}
            <View style={[styles.corner, styles.tl]} />
            <View style={[styles.corner, styles.tr]} />
            <View style={[styles.corner, styles.bl]} />
            <View style={[styles.corner, styles.br]} />
          </>
        )}
      </View>

      {/* Result */}
      {result && (
        <Card style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <View style={styles.shapeBadge}>
              <Text style={styles.shapeBadgeText}>{result.shape}</Text>
            </View>
            <Text style={styles.resultLabel}>Face Shape Detected</Text>
          </View>
          <Text style={styles.resultDesc}>{result.description}</Text>
        </Card>
      )}

      {/* Buttons */}
      <View style={styles.actions}>
        <AppButton label="📷  Scan My Face" onPress={handleScan} loading={scanning} />
        <View style={{ height: scale(10) }} />
        <AppButton label="📁  Upload Photo" onPress={() => Alert.alert('Upload', 'Camera roll picker goes here.')} variant="outline" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  cameraBox: {
    height: scale(280),
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
    backgroundColor: 'rgba(6,13,26,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(12),
  },
  scanningText: { color: '#60A5FA', fontSize: scale(14), fontWeight: '600' },
  scanLine: {
    position: 'absolute',
    left: '10%',
    right: '10%',
    height: 1.5,
    backgroundColor: '#2563EB',
    opacity: 0.5,
  },
  // Corner guides
  corner: {
    position: 'absolute',
    width: scale(24),
    height: scale(24),
    borderColor: '#2563EB',
    borderWidth: 2.5,
  },
  tl: { top: scale(20),  left: scale(20),  borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 6 },
  tr: { top: scale(20),  right: scale(20), borderLeftWidth: 0,  borderBottomWidth: 0, borderTopRightRadius: 6 },
  bl: { bottom: scale(20), left: scale(20),  borderRightWidth: 0, borderTopWidth: 0,    borderBottomLeftRadius: 6 },
  br: { bottom: scale(20), right: scale(20), borderLeftWidth: 0,  borderTopWidth: 0,    borderBottomRightRadius: 6 },
  // Result card
  resultCard: { marginBottom: scale(12) },
  resultHeader: { flexDirection: 'row', alignItems: 'center', gap: scale(10), marginBottom: scale(8) },
  shapeBadge: { backgroundColor: '#1D4ED8', borderRadius: scale(8), paddingHorizontal: scale(12), paddingVertical: scale(4) },
  shapeBadgeText: { color: '#BFDBFE', fontWeight: '800', fontSize: scale(13) },
  resultLabel: { color: '#94A3B8', fontSize: scale(13) },
  resultDesc: { color: '#CBD5E1', fontSize: scale(13), lineHeight: scale(20) },
  actions: { gap: scale(0) },
});