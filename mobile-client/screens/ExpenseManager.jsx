import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, Modal, StyleSheet, } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import EditCard from "../components/EditCard"; 

const mockExpenses = [
  {
    id: 1,
    category: "Food",
    amount: 150.0,
    expense_date: "2025-05-12T00:00:00.000Z",
    description: "Lunch at Jollibee",
  },
  {
    id: 2,
    category: "Transport",
    amount: 30.0,
    expense_date: "2025-05-11T00:00:00.000Z",
    description: "To Office",
  },
  {
    id: 3,
    category: "Food",
    amount: 100.0,
    expense_date: "2025-05-11T00:00:00.000Z",
    description: "Lunch",
  },
  {
    id: 4,
    category: "Transport",
    amount: 30.0,
    expense_date: "2025-05-11T00:00:00.000Z",
    description: "To Home",
  },
  {
    id: 5,
    category: "Groceries",
    amount: 60.0,
    expense_date: "2025-05-12T00:00:00.000Z",
    description: "Canned goods",
  },
  {
    id: 6,
    category: "Bills",
    amount: 3000.0,
    expense_date: "2025-05-13T00:00:00.000Z",
    description: "Rent Bill",
  },
  {
    id: 7,
    category: "Entertainment",
    amount: 150.0,
    expense_date: "2025-05-13T00:00:00.000Z",
    description: "Netflix",
  },
];

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [sortCategory, setSortCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    setExpenses(mockExpenses);
  }, []);

  const handleDelete = (id) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this expense?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setExpenses((prev) => prev.filter((exp) => exp.id !== id));
        },
      },
    ]);
  };

  const handleSaveEdit = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp))
    );
    setEditingExpense(null);
  };

  const getSortedExpenses = () => {
    let filtered = [...expenses];

    if (sortCategory !== "All") {
      filtered = filtered.filter(
        (exp) => exp.category.toLowerCase() === sortCategory.toLowerCase()
      );
    }

    switch (sortOption) {
      case "amountAsc":
        filtered.sort((a, b) => a.amount - b.amount);
        break;
      case "amountDesc":
        filtered.sort((a, b) => b.amount - a.amount);
        break;
      case "dateAsc":
        filtered.sort((a, b) => new Date(a.expense_date) - new Date(b.expense_date));
        break;
      case "dateDesc":
        filtered.sort((a, b) => new Date(b.expense_date) - new Date(a.expense_date));
        break;
    }

    return filtered;
  };

  return (
    <View style={styles.container}>
      {/* 
      <Text style={styles.header}>
        <Ionicons name="list" size={24} /> Expense Manager
      </Text>
      */}

      {/* Filters */}
      <View style={styles.filterSection}>
        <Text style={styles.label}>Sort by Category:</Text>
        <Picker
          selectedValue={sortCategory}
          onValueChange={(itemValue) => setSortCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Bills" value="Bills" />
          <Picker.Item label="Groceries" value="Groceries" />
          <Picker.Item label="Transport" value="Transport" />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Shopping" value="Shopping" />
          <Picker.Item label="Entertainment" value="Entertainment" />
          <Picker.Item label="Others" value="Others" />
        </Picker>

        <Text style={styles.label}>Sort by:</Text>
        <Picker
          selectedValue={sortOption}
          onValueChange={(itemValue) => setSortOption(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="None" value="" />
          <Picker.Item label="Date (Old to New)" value="dateAsc" />
          <Picker.Item label="Date (New to Old)" value="dateDesc" />
          <Picker.Item label="Amount (Low to High)" value="amountAsc" />
          <Picker.Item label="Amount (High to Low)" value="amountDesc" />
        </Picker>
      </View>

      {/* Expense List */}
      <FlatList
        data={getSortedExpenses()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>Category: {item.category}</Text>
            <Text style={styles.cardText}>Amount: ₱{item.amount.toFixed(2)}</Text>
            <Text style={styles.cardText}>
              Date: {new Date(item.expense_date).toLocaleDateString()}
            </Text>
            <Text style={styles.cardText}>Note: {item.description}</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setEditingExpense(item)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No expenses found.</Text>}
      />

      {/* Edit Modal */}
      <Modal visible={!!editingExpense} animationType="slide" transparent>
        {editingExpense && (
          <EditCard
            visible={!!editingExpense}
            expense={editingExpense}
            onClose={() => setEditingExpense(null)}
            onSave={handleSaveEdit}
          />
        )}
      </Modal>
    </View>
  );
};

export default ExpenseManager;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F4F2F2",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#443627",
    marginBottom: 16,
  },
  filterSection: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "600",
    marginTop: 8,
  },
  picker: {
    backgroundColor: "white",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 4,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  editButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  empty: {
    textAlign: "center",
    marginTop: 32,
    fontSize: 16,
    color: "#999",
  },
});
