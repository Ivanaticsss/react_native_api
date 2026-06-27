import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  ScrollView, Dimensions, Alert,
} from 'react-native';
import Header from '../../components/ui/Header';
import SalonCard from '../../components/SalonCard';

const { width: SW } = Dimensions.get('window');
const scale = (s: number) => Math.round((SW / 390) * s);

const SALONS = [
  { name: 'Snip & Style Salon',   address: 'Brgy. Poblacion, Nasugbu, Batangas', rating: 5, distance: '0.3 km' },
  { name: 'The Barber Lounge',    address: 'Brgy. Reparo, Nasugbu, Batangas',    rating: 4, distance: '0.7 km' },
  { name: 'Glow Hair Studio',     address: 'Brgy. Cogunan, Nasugbu, Batangas',   rating: 4, distance: '1.2 km' },
  { name: 'Classic Cuts',         address: 'Brgy. Calayo, Nasugbu, Batangas',    rating: 3, distance: '1.8 km' },
];

export default function SalonsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Header title="Nearby Salons" />

        <View style={styles.locationBadge}>
          <Text style={styles.locationText}>📍 Nasugbu, Batangas</Text>
        </View>

        <Text style={styles.sectionTitle}>SALONS NEAR YOU</Text>
        {SALONS.map((salon) => (
          <SalonCard
            key={salon.name}
            name={salon.name}
            address={salon.address}
            rating={salon.rating}
            distance={salon.distance}
            onBook={() => Alert.alert('Book Appointment', `Book at ${salon.name}?`)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0A0F1E' },
  scroll: { padding: scale(20), paddingBottom: scale(40) },
  locationBadge: {
    backgroundColor: '#0F172A',
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: '#1E3A5F',
    padding: scale(10),
    marginBottom: scale(20),
  },
  locationText: { color: '#60A5FA', fontSize: scale(13), fontWeight: '600' },
  sectionTitle: {
    color: '#94A3B8', fontSize: scale(11), fontWeight: '700',
    letterSpacing: 1, marginBottom: scale(10),
  },
});