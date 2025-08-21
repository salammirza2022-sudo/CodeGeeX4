import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

export type Post = {
  id: string;
  userId: string;
  username: string;
  caption?: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  createdAt: number;
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <View style={styles.card}>
      <Text style={styles.user}>@{post.username}</Text>
      {post.mediaType === 'image' ? (
        <Image source={{ uri: post.mediaUrl }} style={styles.media} resizeMode="cover" />
      ) : (
        <Video
          source={{ uri: post.mediaUrl }}
          style={styles.media}
          useNativeControls
          resizeMode="cover"
          isLooping
        />
      )}
      {post.caption ? <Text style={styles.caption}>{post.caption}</Text> : null}
      <Text style={styles.time}>{new Date(post.createdAt).toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', marginBottom: 12, borderRadius: 12, overflow: 'hidden' },
  user: { padding: 12, fontWeight: '600' },
  media: { width: '100%', height: 300, backgroundColor: '#eee' },
  caption: { padding: 12 },
  time: { paddingHorizontal: 12, paddingBottom: 12, color: '#777' }
});
