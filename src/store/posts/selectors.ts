import { createSelector } from 'reselect';
import Category from 'src/models/Category';
import Post from 'src/models/Post';
import { getFavorites } from 'src/store/personal/selectors';
import { RootState } from 'src/store/types';

const getPosts = (state: RootState) => state.posts.posts;
export const getCategories = (state: RootState) => state.posts.categories;

export const getFavoritesPosts = createSelector(getPosts, getFavorites, (posts, favorites) => {
  return favorites.reduce((favoritesPosts, id) => {
    const post = posts[id];
    post && favoritesPosts.push(post);
    return favoritesPosts;
  }, [] as Post[]);
});

export const getPostsByCategory = createSelector(
  getPosts,
  (_: any, category: Category) => category.id,
  (posts, categoryId) => {
    return Object.values(posts).filter(post => post.categoryId === categoryId);
  }
);

export const getPostById = createSelector(
  getPosts,
  (_: any, postId: string) => postId,
  (posts, postId) => {
    return posts[postId];
  }
);
