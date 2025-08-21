import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

type Thread = { id: string; title: string };

export default function ChatListScreen({ navigation }: any) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const load = async () => {
    const snap = await getDocs(collection(db, 'threads'));
    setThreads(snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })));
  };
  useEffect(() => { load(); }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={threads}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ChatDetail', { threadId: item.id, title: item.title })}>
            <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
              <Text style={{ fontWeight: '600' }}>{item.title}</Text>
              <Text style={{ color: '#777' }}>Öffnen…</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
