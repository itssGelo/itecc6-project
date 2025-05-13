import React, { useState } from "react";
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet, ScrollView, Platform, } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const EditCard = ({ visible, expense, onClose, onSave }) => {
  const [editedExpense, setEditedExpense] = useState({
    ...expense,
    expense_date: new Date(expense.expense_date),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (key, value) => {
    setEditedExpense((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || editedExpense.expense_date;
    setShowDatePicker(false);
    handleChange("expense_date", currentDate);
  };

  const handleSubmit = () => {
    onSave({
      ...editedExpense,
      expense_date: editedExpense.expense_date.toISOString(),
      amount: parseFloat(editedExpense.amount),
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.input}
            >
              <Text>{editedExpense.expense_date.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={editedExpense.expense_date}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleDateChange}
              />
            )}

            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={editedExpense.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <Picker.Item label="Bills" value="Bills" />
                <Picker.Item label="Groceries" value="Groceries" />
                <Picker.Item label="Transport" value="Transport" />
                <Picker.Item label="Food" value="Food" />
                <Picker.Item label="Shopping" value="Shopping" />
                <Picker.Item label="Entertainment" value="Entertainment" />
                <Picker.Item label="Others" value="Others" />
              </Picker>
            </View>

            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(editedExpense.amount)}
              onChangeText={(value) => handleChange("amount", value)}
            />

            <Text style={styles.label}>Note</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              multiline
              value={editedExpense.description}
              onChangeText={(value) => handleChange("description", value)}
            />

            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default EditCard;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    width: "90%",
    maxHeight: "90%",
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    backgroundColor: "#F4F2F2",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: "#F4F2F2",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#00FF40",
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#aaa",
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: "center",
  },
  saveText: {
    color: "#443627",
    fontWeight: "bold",
  },
  cancelText: {
    color: "white",
    fontWeight: "bold",
  },
});
