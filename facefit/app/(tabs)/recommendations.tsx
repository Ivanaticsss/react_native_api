import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  ScrollView, Dimensions, Alert,
} from 'react-native';
import Header from '../../components/ui/Header';
import HairstyleCard from '../../components/HairstyleCard';

const { width: SW } = Dimensions.get('window');
const scale = (s: number) => Math.round((SW / 390) * s);

const SAMPLE = [
  { name: 'Layered Cut',      match: 95 },
  { name: 'Side Swept Bangs', match: 88 },
  { name: 'Curly Bob',        match: 80 },
  { name: 'Slick Back',       match: 74 },
];

export default function RecommendationsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Header title="Recommendations" />

        {/* Face shape summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Detected Face Shape</Text>
          <View style={styles.shapeBadge}>
            <Text style={styles.shapeBadgeText}>Oval</Text>
          </View>
          <Text style={styles.summaryDesc}>
            Balanced proportions — suits almost any hairstyle. Ranked from highest to lowest match.
          </Text>
        </View>

        {/* Hairstyle list */}
        <Text style={styles.sectionTitle}>RECOMMENDED HAIRSTYLES</Text>
        {SAMPLE.map((item, i) => (
          <HairstyleCard
            key={item.name}
            rank={i + 1}
            name={item.name}
            match={item.match}
            onPress={() => Alert.alert(item.name, `${item.match}% match for your face shape.`)}
          />
        ))}

        {/* AI Prompt hint */}
        <View style={styles.promptCard}>
          <Text style={styles.promptTitle}>💬 Refine with AI</Text>
          <Text style={styles.promptDesc}>
            Not satisfied? Describe your preferences (hair length, texture, style inspiration) and get personalized suggestions.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0A0F1E' },
  scroll: { padding: scale(20), paddingBottom: scale(40) },
  summaryCard: {
    backgroundColor: '#111827',
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: '#1E3A5F',
    padding: scale(16),
    marginBottom: scale(20),
    gap: scale(8),
  },
  summaryLabel: { color: '#94A3B8', fontSize: scale(12), fontWeight: '600' },
  shapeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#1D4ED8',
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    paddingVertical: scale(4),
  },
  shapeBadgeText: { color: '#BFDBFE', fontWeight: '800', fontSize: scale(14) },
  summaryDesc: { color: '#64748B', fontSize: scale(13), lineHeight: scale(19) },
  sectionTitle: {
    color: '#94A3B8', fontSize: scale(11), fontWeight: '700',
    letterSpacing: 1, marginBottom: scale(10),
  },
  promptCard: {
    backgroundColor: '#0D1A2E',
    borderRadius: scale(14),
    borderWidth: 1,
    borderColor: '#1E3A5F',
    padding: scale(16),
    marginTop: scale(8),
  },
  promptTitle: { color: '#60A5FA', fontWeight: '700', fontSize: scale(14), marginBottom: scale(6) },
  promptDesc: { color: '#64748B', fontSize: scale(13), lineHeight: scale(19) },
});