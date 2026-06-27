import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export type Category = 'Food' | 'Transpo' | 'Bills';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category;
}

const CATEGORY_EMOJI: Record<Category, string> = {
  Food: '🍟',
  Transpo: '🚗',
  Bills: '💵',
};

interface ExpenseCardProps {
  item: Expense;
  onDelete: (id: string) => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ item, onDelete }) => (
  <View style={styles.card}>
    <Text style={styles.cardEmoji}>{CATEGORY_EMOJI[item.category]}</Text>
    <View style={styles.cardInfo}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardCategory}>{item.category}</Text>
    </View>
    <Text style={styles.cardAmount}>₱{item.amount.toFixed(2)}</Text>
    <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteBtn}>
      <Text style={styles.deleteBtnText}>✕</Text>
    </TouchableOpacity>
  </View>
);

export default ExpenseCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    color: '#1f2937',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardCategory: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 2,
  },
  cardAmount: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  deleteBtn: {
    padding: 4,
  },
  deleteBtnText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: 'bold',
  },
});