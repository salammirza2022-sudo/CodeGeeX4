import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, SafeAreaView, Text, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import dayjs from 'dayjs';
import { db, storage } from '../firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

type Story = {
  id: string;
  userId: string;
  mediaUrl: string;
  createdAt: number;
  expiresAt: number;
};

export default function StoryScreen() {
  const [stories, setStories] = useState<Story[]>([]);

  const load = async () => {
    const now = Date.now();
    const q = query(collection(db, 'stories'), where('expiresAt', '>', now));
    const snap = await getDocs(q);
    const data: Story[] = snap.docs.map(d => ({ id: d.id, ...d.data() } as any));
    setStories(data);
  };

  const addStory = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 });
    if (res.canceled) return;
    try {
      const asset = res.assets[0];
      const blob = await (await fetch(asset.uri)).blob();
      const id = Date.now().toString();
      const storageRef = ref(storage, `stories/${id}`);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      const createdAt = Date.now();
      const expiresAt = dayjs(createdAt).add(24, 'hour').valueOf();
      await addDoc(collection(db, 'stories'), { userId: 'demo', mediaUrl: url, createdAt, expiresAt });
      Alert.alert('Story gepostet!');
      load();
    } catch (e: any) {
      Alert.alert('Fehler', e.message);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 12 }}>
      <Button title="Story hinzufügen" onPress={addStory} />
      <FlatList
        data={stories}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 8 }}>
            <Image source={{ uri: item.mediaUrl }} style={{ width: '100%', height: 240, backgroundColor: '#eee' }} />
            <Text>Verfällt: {new Date(item.expiresAt).toLocaleString()}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
