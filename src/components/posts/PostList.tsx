import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import PostModel from 'src/models/Post';
import Post from 'src/components/posts/Post';
import NoPosts, { NoPostsMessage } from 'src/screens/posts/NoPosts';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

type Props = {
  posts: PostModel[];
  noPostsMessage: NoPostsMessage;
  isLoading?: boolean;
};

const PostList: React.FC<Props> = ({ posts, noPostsMessage, isLoading }) => {
  if (isLoading && !posts.length) {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    );
  }

  if (!posts.length) {
    return <NoPosts {...noPostsMessage} />;
  }

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <Post post={item} />}
      keyExtractor={post => String(post.id)}
      contentContainerStyle={styles.container}
    />
  );
};

export default PostList;
