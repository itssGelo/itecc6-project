import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockExpenses = [
  {
    id: 1,
    category: 'Food',
    amount: '150',
    expense_date: '2025-05-12',
    description: 'Lunch at Jollibee',
  },
  {
    id: 2,
    category: 'Transport',
    amount: '30',
    expense_date: '2025-05-11',
    description: 'To Office',
  },
  {
    id: 3,
    category: 'Food',
    amount: '100',
    expense_date: '2025-05-11',
    description: 'Lunch',
  },
  {
    id: 4,
    category: 'Transport',
    amount: '30',
    expense_date: '2025-05-11',
    description: 'To Home',
  },
  {
    id: 5,
    category: 'Groceries',
    amount: '60',
    expense_date: '2025-05-12',
    description: 'Canned goods',
  },
  {
    id: 6,
    category: 'Bills',
    amount: '3000',
    expense_date: '2025-05-13',
    description: 'Rent Bill',
  },
  {
    id: 7,
    category: 'Entertainment',
    amount: '150',
    expense_date: '2025-05-13',
    description: 'Netflix',
  },
];

const parseAmount = (amount) => {
  const parsed = Number(amount);
  return isNaN(parsed) ? 0 : parsed;
};

const parseDate = (date) => {
  const d = new Date(date);
  return isNaN(d.getTime()) ? new Date() : d;
};

const isToday = (date) => {
  const today = new Date();
  const d = parseDate(date);
  return d.toDateString() === today.toDateString();
};

const isWithinLast7Days = (date) => {
  const d = parseDate(date);
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);
  return d >= sevenDaysAgo && d <= now;
};

const isLastMonth = (date) => {
  const d = parseDate(date);
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
  return (
    d.getMonth() === lastMonth.getMonth() &&
    d.getFullYear() === lastMonth.getFullYear()
  );
};

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    setExpenses(mockExpenses);
  }, []);

  const todayTotal = expenses
    .filter((e) => isToday(e.expense_date))
    .reduce((sum, e) => sum + parseAmount(e.amount), 0);

  const weekTotal = expenses
    .filter((e) => isWithinLast7Days(e.expense_date))
    .reduce((sum, e) => sum + parseAmount(e.amount), 0);

  const lastMonthTotal = expenses
    .filter((e) => isLastMonth(e.expense_date))
    .reduce((sum, e) => sum + parseAmount(e.amount), 0);

  const overallTotal = expenses.reduce(
    (sum, e) => sum + parseAmount(e.amount),
    0
  );

  return (
    <ScrollView style={styles.container}>
      {/* Optional Header */}
      {/* <View style={styles.header}>
        <Ionicons name="home-outline" size={24} color="#443627" />
        <Text style={styles.headerText}>Dashboard</Text>
      </View> */}

      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today</Text>
          <Text style={styles.cardAmount}>₱{todayTotal.toFixed(2)}</Text>
        </View>
        <View style={[styles.card, { backgroundColor: '#F0F0F0' }]}>
          <Text style={styles.cardTitle}>7 Days Ago</Text>
          <Text style={styles.cardAmount}>₱{weekTotal.toFixed(2)}</Text>
        </View>
        <View style={[styles.card, { backgroundColor: '#E0E0E0' }]}>
          <Text style={styles.cardTitle}>Last Month</Text>
          <Text style={styles.cardAmount}>₱{lastMonthTotal.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.recentContainer}>
        <View style={styles.recentHeader}>
          <Ionicons name="time-outline" size={20} color="#443627" />
          <Text style={styles.recentTitle}>Recent</Text>
        </View>

        {/* Fixed Header + Scrollable Rows */}
        <View style={styles.tableWrapper}>
          {/* Fixed Table Header */}
          <View style={[styles.expenseRow, styles.tableHeader]}>
            <Text style={[styles.cell, styles.headerCell]}>Category</Text>
            <Text style={[styles.cell, styles.headerCell]}>Amount</Text>
            <Text style={[styles.cell, styles.headerCell]}>Date</Text>
            <Text style={[styles.cell, styles.headerCell]}>Note</Text>
          </View>

          {/* Scrollable Table Rows */}
          <ScrollView
            style={styles.scrollArea}
            showsVerticalScrollIndicator={true}
          >
            {expenses.length === 0 ? (
              <Text style={{ color: 'gray', marginTop: 10 }}>
                No expenses recorded.
              </Text>
            ) : (
              expenses
                .sort(
                  (a, b) => parseDate(b.expense_date) - parseDate(a.expense_date)
                )
                .map((item, index) => (
                  <View
                    key={item.id}
                    style={[
                      styles.expenseRow,
                      {
                        backgroundColor:
                          index % 2 === 0 ? '#EBE9E9' : '#D9D9D9',
                      },
                    ]}
                  >
                    <Text style={styles.cell}>{item.category}</Text>
                    <Text style={styles.cell}>
                      ₱{parseAmount(item.amount).toFixed(2)}
                    </Text>
                    <Text style={styles.cell}>
                      {parseDate(item.expense_date).toLocaleDateString()}
                    </Text>
                    <Text style={styles.cell}>{item.description}</Text>
                  </View>
                ))
            )}
          </ScrollView>
        </View>

        <Text style={styles.totalText}>Total: ₱{overallTotal.toFixed(2)}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#443627',
    marginLeft: 10,
  },
  cardsContainer: {
    flexDirection: 'column',
    gap: 15,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#443627',
    marginBottom: 5,
  },
  cardAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#443627',
  },
  recentContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  recentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#443627',
    marginLeft: 5,
  },
  tableWrapper: {
    marginTop: 10,
  },
  tableHeader: {
    backgroundColor: '#D9D9D9',
  },
  scrollArea: {
    maxHeight: 150,
  },
  expenseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: '#443627',
  },
  headerCell: {
    fontWeight: 'bold',
  },
  totalText: {
    textAlign: 'right',
    marginTop: 10,
    fontWeight: 'bold',
    color: '#443627',
  },
});
