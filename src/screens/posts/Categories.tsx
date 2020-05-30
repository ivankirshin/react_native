import React from 'react';
import { StyleSheet, View } from 'react-native';
import Category from 'src/components/posts/Category';
import { useTypedSelector } from 'src/store/types';

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

const Categories: React.FC = () => {
  const categories = useTypedSelector(state => state.posts.categories);

  return (
    <View style={styles.container}>
      {categories.map(category => (
        <Category category={category} key={category.id} />
      ))}
    </View>
  );
};

export default Categories;
