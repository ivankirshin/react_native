import Category from 'src/models/Category';
import Post from 'src/models/Post';
import actions from 'src/store/posts/actions';
import { InferActions } from 'src/store/types';

export type PostsCollection = { [key: string]: Post };

export type PostState = {
  posts: PostsCollection;
  categories: Category[];
};

export type PostActions = InferActions<typeof actions>;
