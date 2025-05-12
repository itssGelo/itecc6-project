import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExpenseManager = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🗂️ Expense Manager Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default ExpenseManager;
