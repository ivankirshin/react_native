import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PostList from 'src/components/posts/PostList';
import { PostCategoriesNavProp, PostListRouteProp } from 'src/navigation/types';
import { getPostsByCategory } from 'src/store/posts/selectors';
import { AppDispatch, useTypedSelector } from 'src/store/types';
import { useNavigation } from '@react-navigation/native';
import { getPostsByCategory as getPostsByCategoryThunk } from 'src/store/posts/thunks';

type Props = {
  route: PostListRouteProp;
};

const PostsByCategory: React.FC<Props> = ({ route }) => {
  const { category } = route.params;
  const posts = useTypedSelector(state => getPostsByCategory(state, category));
  const navigation = useNavigation<PostCategoriesNavProp>();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: category.title,
    });
  }, [navigation, category.title]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        await dispatch(getPostsByCategoryThunk(category.id));
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, [dispatch, category.id]);

  return <PostList isLoading={isLoading} posts={posts} noPostsMessage={{ subtitle: 'You can add first post in this category' }} />;
};

export default PostsByCategory;
