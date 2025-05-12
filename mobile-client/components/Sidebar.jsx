import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import Dashboard from '../screens/Dashboard';
import AddExpense from '../screens/AddExpense';
import ExpenseManager from '../screens/ExpenseManager';
import MonthlySummary from '../screens/MonthlySummary';

const Drawer = createDrawerNavigator();

function ExitScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.replace('Startup');
  }, [navigation]);

  return (
    <View style={styles.exitContainer}>
      <Text style={styles.exitText}>Exiting...</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: '#F2E2B1' }}>
      <View style={styles.header}>
        <Ionicons name="wallet-outline" size={48} color="#443627" />
        <Text style={styles.title}>Expense Tracker</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function Sidebar() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: { backgroundColor: '#F2F6D0' },
        headerTintColor: '#443627',
        drawerActiveTintColor: '#443627',
        drawerLabelStyle: {
          fontWeight: 'bold',
          fontSize: 16,
        },
        drawerStyle: {
          backgroundColor: '#F2E2B1',
        },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Add Expense"
        component={AddExpense}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Expense Manager"
        component={ExpenseManager}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Monthly Summary"
        component={MonthlySummary}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Exit"
        component={ExitScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="exit-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#443627',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#443627',
    marginTop: 10,
  },
  exitContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitText: {
    fontSize: 18,
    color: '#443627',
  },
});
