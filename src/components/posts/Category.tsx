import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PostCategoriesNavProp } from 'src/navigation/types';
import CategoryModel from 'src/models/Category';

type Props = {
  category: CategoryModel;
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'column-reverse',
    flexBasis: '45%',
    margin: 5,
    height: 100,
    padding: 7,
    borderRadius: 5,
    elevation: 4,
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
  },
});

const Category: React.FC<Props> = ({ category }) => {
  const navigation = useNavigation<PostCategoriesNavProp>();

  const pressHandler = useCallback(() => {
    navigation.navigate('PostList', { category });
  }, [navigation, category]);

  const cardStyles = { ...styles.card, backgroundColor: category.color };

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={pressHandler} style={cardStyles}>
      <Text style={styles.title}>{category.title}</Text>
    </TouchableOpacity>
  );
};

export default Category;
