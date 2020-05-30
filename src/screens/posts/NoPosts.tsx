import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 27,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',
  },
});

export type NoPostsMessage = {
  title?: string;
  subtitle?: string;
};

const NoPosts: React.FC<NoPostsMessage> = ({ title = 'No posts', subtitle }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);
export default NoPosts;
