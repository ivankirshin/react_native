import Post from 'src/models/Post';
import User from 'src/models/User';
import { InferActions } from 'src/store/types';
import actions from 'src/store/personal/actions';

export type PersonalState = {
  user: Nullable<User>;
  posts: Post[];
  favorites: string[];
};

export type PersonalActions = InferActions<typeof actions>;
