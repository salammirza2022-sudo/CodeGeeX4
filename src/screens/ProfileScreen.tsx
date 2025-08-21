import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Logo from '../components/Logo';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <Logo size={96} />
      <Text style={{ fontSize: 24, fontWeight: '700' }}>TAKTIKKAT</Text>
      <Text>Dein Profil – (Demo)</Text>
    </SafeAreaView>
  );
}
