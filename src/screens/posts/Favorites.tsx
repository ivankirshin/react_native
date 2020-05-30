import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoAuth from 'src/components/auth/NoAuth';
import PostList from 'src/components/posts/PostList';
import { getUser } from 'src/store/personal/selectors';
import { getFavoritesPosts as getFavoritesPostsThunk } from 'src/store/posts/thunks';
import { getFavoritesPosts } from 'src/store/posts/selectors';
import { AppDispatch, useTypedSelector } from 'src/store/types';

const PostsFavorites: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(getUser);
  const isAuth = Boolean(user);
  const favoritesPosts = useTypedSelector(getFavoritesPosts);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        dispatch(getFavoritesPostsThunk());
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    getPosts();
  }, [dispatch]);

  if (!isAuth) return <NoAuth />;

  return <PostList isLoading={isLoading} posts={favoritesPosts} noPostsMessage={{ subtitle: 'You can add any post to your favorites' }} />;
};

export default PostsFavorites;
