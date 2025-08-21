import React, { useState } from 'react';
import { View, TextInput, Button, Image, Alert, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function CreatePostScreen() {
  const [uri, setUri] = useState<string | null>(null);
  const [type, setType] = useState<'image' | 'video' | null>(null);
  const [caption, setCaption] = useState('');

  const pick = async (mediaTypes: ImagePicker.MediaTypeOptions) => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes, quality: 0.8 });
    if (!res.canceled) {
      const asset = res.assets[0];
      setUri(asset.uri);
      setType(asset.type === 'video' ? 'video' : 'image');
    }
  };

  const publish = async () => {
    try {
      if (!uri || !type) return;
      const blob = await (await fetch(uri)).blob();
      const id = Date.now().toString();
      const storageRef = ref(storage, `posts/${id}`);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      await addDoc(collection(db, 'posts'), {
        userId: 'demo', username: 'demo',
        caption, mediaUrl: url, mediaType: type, createdAt: Date.now()
      });
      Alert.alert('Erfolg', 'Post veröffentlicht!');
      setUri(null); setType(null); setCaption('');
    } catch (e: any) {
      Alert.alert('Fehler', e.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, gap: 12 }}>
      <Image source={uri ? { uri } : undefined} style={{ width: '100%', height: 280, backgroundColor: '#eee' }} />
      <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'space-between' }}>
        <Button title="Foto wählen" onPress={() => pick(ImagePicker.MediaTypeOptions.Images)} />
        <Button title="Video wählen" onPress={() => pick(ImagePicker.MediaTypeOptions.Videos)} />
      </View>
      <TextInput
        placeholder="Bildunterschrift…"
        value={caption}
        onChangeText={setCaption}
        style={{ borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8 }}
      />
      <Button title="Veröffentlichen" onPress={publish} />
    </SafeAreaView>
  );
}
