import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert, } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddExpense = () => {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    expense_date: new Date(),
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSave = () => {
    
    setSuccessMessage("Saved Successfully!");
    setForm({
      amount: "",
      category: "",
      description: "",
      expense_date: new Date(),
    });

    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Success Message */}
      {successMessage ? (
        <View style={styles.successBox}>
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      ) : null}

      {/* Date Picker */}
      <Text style={styles.label}>Date</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{form.expense_date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={form.expense_date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(Platform.OS === "ios");
            if (selectedDate) {
              setForm({ ...form, expense_date: selectedDate });
            }
          }}
        />
      )}

      {/* Category Picker */}
      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.category}
          onValueChange={(itemValue) =>
            setForm({ ...form, category: itemValue })
          }
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Bills" value="Bills" />
          <Picker.Item label="Groceries" value="Groceries" />
          <Picker.Item label="Transport" value="Transport" />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Shopping" value="Shopping" />
          <Picker.Item label="Entertainment" value="Entertainment" />
          <Picker.Item label="Others" value="Others" />
        </Picker>
      </View>

      {/* Amount */}
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="₱0.00"
        value={form.amount}
        onChangeText={(text) => setForm({ ...form, amount: text })}
      />

      {/* Description */}
      <Text style={styles.label}>Note</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: "top" }]}
        multiline
        placeholder="Enter a note"
        value={form.description}
        onChangeText={(text) => setForm({ ...form, description: text })}
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#443627",
  },
  input: {
    backgroundColor: "#F4F2F2",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  pickerContainer: {
    backgroundColor: "#F4F2F2",
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#00FF40",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#443627",
  },
  successBox: {
    backgroundColor: "#C6F6D5",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  successText: {
    color: "#22543D",
    textAlign: "center",
  },
});
