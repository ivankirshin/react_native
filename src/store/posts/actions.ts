/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PostsCollection } from 'src/store/posts/types';

export const addPosts = (posts: PostsCollection) =>
  ({
    type: 'posts/ADD',
    posts,
  } as const);

export const deletePost = (postId: string) =>
  ({
    type: 'posts/DELETE',
    postId,
  } as const);

export default { addPosts, deletePost };
