import { PostActions, PostState } from 'src/store/posts/types';

const initialState: PostState = {
  posts: {},
  categories: [],
};

const omitProp = (obj: Record<string | number, any>, propName: string | number) => {
  const { [propName]: _, ...newObj } = obj;
  return newObj;
};

const postsReducer = (state = initialState, action: PostActions): PostState => {
  switch (action.type) {
    case 'posts/DELETE':
      return { ...state, posts: omitProp(state.posts, action.postId) };
    case 'posts/ADD':
      return { ...state, posts: { ...state.posts, ...action.posts } };
    default:
      return state;
  }
};

export default postsReducer;
