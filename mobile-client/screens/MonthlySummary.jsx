import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet, Platform, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const MonthlySummary = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [amountSort, setAmountSort] = useState("");
  const [expenses, setExpenses] = useState([]);

  // Date Picker States
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    const mockData = [
      { category: "Food", expense_date: "2025-05-12", amount: "150.00", description: "Lunch at Jollibee" },
      { category: "Transport", expense_date: "2025-05-11", amount: "30.00", description: "To Office" },
      { category: "Food", expense_date: "2025-05-11", amount: "100.00", description: "Lunch" },
      { category: "Transport", expense_date: "2025-05-11", amount: "30.00", description: "To Home" },
      { category: "Groceries", expense_date: "2025-05-12", amount: "60.00", description: "Canned goods" },
      { category: "Bills", expense_date: "2025-05-13", amount: "3000.00", description: "Rent Bill" },
      { category: "Entertainment", expense_date: "2025-05-13", amount: "150.00", description: "Netflix" },
    ];
    setExpenses(mockData);
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; // returns 'YYYY-MM-DD'
  };

  let filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.expense_date);
    const start = startDate ? new Date(startDate + "T00:00:00") : null;
    const end = endDate ? new Date(endDate + "T23:59:59") : null;

    return (
      (!start || expenseDate >= start) &&
      (!end || expenseDate <= end) &&
      (!categoryFilter || expense.category === categoryFilter)
    );
  });

  if (amountSort === "low") {
    filteredExpenses.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
  } else if (amountSort === "high") {
    filteredExpenses.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
  }

  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );

  return (
    <View style={styles.container}>
      {/* Filters */}
      <View style={styles.filtersContainer}>
        {/* Start Date Picker */}
        <View style={styles.filterRow}>
          <Text style={styles.label}>From:</Text>
          <Pressable style={styles.input} onPress={() => setShowStartPicker(true)}>
            <Text>{startDate || "YYYY-MM-DD"}</Text>
          </Pressable>
          {showStartPicker && (
            <DateTimePicker
              value={startDate ? new Date(startDate) : new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowStartPicker(false);
                if (selectedDate) {
                  setStartDate(formatDate(selectedDate));
                }
              }}
            />
          )}
        </View>

        {/* End Date Picker */}
        <View style={styles.filterRow}>
          <Text style={styles.label}>To:</Text>
          <Pressable style={styles.input} onPress={() => setShowEndPicker(true)}>
            <Text>{endDate || "YYYY-MM-DD"}</Text>
          </Pressable>
          {showEndPicker && (
            <DateTimePicker
              value={endDate ? new Date(endDate) : new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowEndPicker(false);
                if (selectedDate) {
                  setEndDate(formatDate(selectedDate));
                }
              }}
            />
          )}
        </View>

        <View style={styles.filterRow}>
          <Text style={styles.label}>Category:</Text>
          <Picker
            selectedValue={categoryFilter}
            onValueChange={setCategoryFilter}
            style={styles.picker}
          >
            <Picker.Item label="All" value="" />
            <Picker.Item label="Bills" value="Bills" />
            <Picker.Item label="Groceries" value="Groceries" />
            <Picker.Item label="Transport" value="Transport" />
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Shopping" value="Shopping" />
            <Picker.Item label="Entertainment" value="Entertainment" />
            <Picker.Item label="Others" value="Others" />
          </Picker>
        </View>

        <View style={styles.filterRow}>
          <Text style={styles.label}>Sort:</Text>
          <Picker
            selectedValue={amountSort}
            onValueChange={setAmountSort}
            style={styles.picker}
          >
            <Picker.Item label="None" value="" />
            <Picker.Item label="Low to High" value="low" />
            <Picker.Item label="High to Low" value="high" />
          </Picker>
        </View>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Category</Text>
        <Text style={styles.tableHeaderText}>Date</Text>
        <Text style={styles.tableHeaderText}>Amount</Text>
        <Text style={styles.tableHeaderText}>Note</Text>
      </View>

      {/* Table Rows */}
      <FlatList
        style={{ maxHeight: 200 }}
        data={filteredExpenses}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.tableRow,
              { backgroundColor: index % 2 === 0 ? "#EBE9E9" : "#D9D9D9" },
            ]}
          >
            <Text style={styles.tableCell}>{item.category}</Text>
            <Text style={styles.tableCell}>
              {new Date(item.expense_date).toLocaleDateString()}
            </Text>
            <Text style={styles.tableCell}>
              ₱{parseFloat(item.amount).toFixed(2)}
            </Text>
            <Text style={styles.tableCell}>{item.description || "-"}</Text>
          </View>
        )}
      />

      {/* Total */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ₱{totalAmount.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default MonthlySummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filterRow: {
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#F4F2F2",
    padding: 8,
    borderRadius: 8,
  },
  picker: {
    backgroundColor: "#F4F2F2",
    borderRadius: 8,
    height: Platform.OS === "ios" ? 150 : 50,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    paddingVertical: 8,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    paddingHorizontal: 4,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 4,
  },
  totalContainer: {
    marginTop: 8,
    marginBottom: 8,
    alignItems: "flex-end",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#443627",
  },
});
