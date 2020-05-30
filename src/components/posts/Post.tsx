import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Card from 'src/components/uikit/Card';
import { useNavigation } from '@react-navigation/native';
import PostModel from 'src/models/Post';
import { PostDetailsNavProp } from 'src/navigation/types';

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: 10,
  },
  title: {
    fontWeight: '600',
    marginBottom: 10,
  },
  content: {
    marginBottom: 20,
  },
  containerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stats: {
    color: 'grey',
    fontSize: 12,
  },
});

type Props = {
  post: PostModel;
};

const Post: React.FC<Props> = ({ post }) => {
  const navigation = useNavigation<PostDetailsNavProp>();

  const pressHandler = useCallback(() => {
    navigation.navigate('PostDetails', { postId: post.id });
  }, [navigation, post.id]);

  return (
    <TouchableOpacity onPress={pressHandler} activeOpacity={0.7} style={styles.card}>
      <Card>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.content} numberOfLines={4}>
          {post.content}
        </Text>
        <View style={styles.containerStats}>
          <Text style={styles.stats}>Просмотры: {post.views}</Text>
          <Text style={styles.stats}>Избранное: {post.favorites}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default Post;
