import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartupPage from './screens/StartupPage';
import Sidebar from './components/Sidebar'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Startup">
        <Stack.Screen
          name="Startup"
          component={StartupPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={Sidebar}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
