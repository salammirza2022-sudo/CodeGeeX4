import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, SafeAreaView } from 'react-native';
import { db } from '../firebase';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';

type Message = { id: string; text: string; userId: string; createdAt: any };

export default function ChatScreen({ route }: any) {
  const { threadId } = route.params;
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'threads', threadId, 'messages'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })));
    });
    return () => unsub();
  }, [threadId]);

  const send = async () => {
    if (!text.trim()) return;
    await addDoc(collection(db, 'threads', threadId, 'messages'), {
      text, userId: 'demo', createdAt: serverTimestamp()
    });
    setText('');
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 12 }}>
      <FlatList
        data={messages}
        keyExtractor={(i) => i.id}
        inverted
        renderItem={({ item }) => (
          <View style={{ padding: 8, alignSelf: item.userId === 'demo' ? 'flex-end' : 'flex-start', backgroundColor: '#e8e8ff', borderRadius: 12, marginVertical: 4 }}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TextInput value={text} onChangeText={setText} placeholder="Nachricht…" style={{ flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12 }} />
        <Button title="Senden" onPress={send} />
      </View>
    </SafeAreaView>
  );
}
