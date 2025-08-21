import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import RootTabs from './src/navigation';
import ChatScreen from './src/screens/ChatScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={RootTabs as any} />
        <Stack.Screen name="ChatDetail" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
