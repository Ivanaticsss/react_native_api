import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import ExpenseCard, { Expense, Category } from '@/components/ui/expensecard';

const CATEGORIES: Category[] = ['Food', 'Transpo', 'Bills'];
type FilterType = 'All' | Category;
const FILTERS: FilterType[] = ['All', 'Food', 'Transpo', 'Bills'];

export default function IndexScreen() {
  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Food');
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', title: 'Jollibee Lunch', amount: 180, category: 'Food' },
    { id: '2', title: 'Angkas Ride', amount: 95, category: 'Transpo' },
    { id: '3', title: 'Meralco Bill', amount: 1500, category: 'Bills' },
  ]);

  const filteredExpenses = useMemo<Expense[]>(() => {
    if (activeFilter === 'All') return expenses;
    return expenses.filter((e) => e.category === activeFilter);
  }, [expenses, activeFilter]);

  const total = useMemo<number>(
    () => filteredExpenses.reduce((sum, e) => sum + e.amount, 0),
    [filteredExpenses]
  );

  const handleAddExpense = () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter an item name.');
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid positive amount.');
      return;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: parsedAmount,
      category: selectedCategory,
    };

    setExpenses((prev) => [newExpense, ...prev]);

    setTitle('');
    setAmount('');
  };

  const handleDelete = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        
        <View style={styles.header}>
          <Text style={styles.headerText}>My Expense Tracker</Text>
        </View>

        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          
          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>
              TOTAL ({activeFilter.toUpperCase()})
            </Text>
            <Text style={styles.totalValue}>₱{total.toLocaleString()}</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Item (Baon, Pamasahe)"
            placeholderTextColor="#9ca3af"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={styles.input}
            placeholder="Amount (₱)"
            placeholderTextColor="#9ca3af"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />

          <Text style={styles.categoryLabel}>SELECT CATEGORY:</Text>
          <View style={styles.categoryRow}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryBtn,
                  selectedCategory === cat
                    ? styles.categoryBtnActive
                    : styles.categoryBtnInactive,
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={
                    selectedCategory === cat
                      ? styles.categoryBtnTextActive
                      : styles.categoryBtnTextInactive
                  }
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleAddExpense}>
            <Text style={styles.submitBtnText}>+ Add Expense</Text>
          </TouchableOpacity>

          <View style={styles.filterRow}>
            {FILTERS.map((f) => (
              <TouchableOpacity
                key={f}
                style={[
                  styles.filterBtn,
                  activeFilter === f
                    ? styles.filterBtnActive
                    : styles.filterBtnInactive,
                ]}
                onPress={() => setActiveFilter(f)}
              >
                <Text
                  style={
                    activeFilter === f
                      ? styles.filterBtnTextActive
                      : styles.filterBtnTextInactive
                  }
                >
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((item) => (
              <ExpenseCard 
                key={item.id} 
                item={item} 
                onDelete={handleDelete} 
              />
            ))
          ) : (
            <Text style={styles.emptyText}>No expenses yet.</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#1f2937',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 16,
  },

  totalCard: {
    backgroundColor: '#10b981',
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  totalLabel: {
    color: '#e6fffa',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  totalValue: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
  },

  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1f2937',
    marginBottom: 10,
  },

  categoryLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6b7280',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  categoryBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  categoryBtnActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  categoryBtnInactive: {
    backgroundColor: '#ffffff',
    borderColor: '#d1d5db',
  },
  categoryBtnTextActive: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  categoryBtnTextInactive: {
    color: '#374151',
    fontSize: 14,
  },

  submitBtn: {
    backgroundColor: '#1f2937',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  filterRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 14,
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  filterBtnActive: {
    backgroundColor: '#1f2937',
  },
  filterBtnInactive: {
    backgroundColor: '#e5e7eb',
  },
  filterBtnTextActive: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 13,
  },
  filterBtnTextInactive: {
    color: '#374151',
    fontSize: 13,
  },

  emptyText: {
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 15,
  },
});