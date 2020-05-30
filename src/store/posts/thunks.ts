import firebase from 'src/firebase';
import { addPosts } from 'src/store/posts/actions';
import { PostsCollection } from 'src/store/posts/types';
import { ThunkResult } from 'src/store/types';
import Post from 'src/models/Post';

const createPost = (title: string, content: string, categoryId: number): ThunkResult<Promise<void>> => async (dispatch, getState) => {
  const newPostKey = firebase
    .database()
    .ref('posts')
    .push().key;
  if (!newPostKey) throw new Error('Database error! Something went wrong when creating a new post!');

  const userId = getState().personal.user?.id;
  if (!userId) throw new Error('Auth error! You should be logged in to create a new post!');

  const postData = {
    id: newPostKey,
    title,
    content,
    categoryId,
    image: 'https://via.placeholder.com/500x200.png',
    views: 0,
    favorites: 0,
    date: new Date().toJSON(),
  };

  const updates = {
    [`posts/${newPostKey}`]: postData,
    [`users/${userId}/posts/${newPostKey}`]: true,
  };

  await firebase
    .database()
    .ref()
    .update(updates);

  dispatch(
    addPosts({
      [newPostKey]: new Post(
        newPostKey,
        categoryId,
        title,
        content,
        postData.image,
        new Date(postData.date),
        postData.views,
        postData.favorites
      ),
    })
  );
};

const getPostsByCategory = (categoryId: number): ThunkResult<Promise<void>> => async dispatch => {
  const ref = firebase
    .database()
    .ref('posts')
    .orderByChild('categoryId')
    .equalTo(categoryId);

  ref.once('value', data => {
    if (!data.exists()) return;
    dispatch(addPosts({ ...(data.val() as PostsCollection) }));
  });
};

const getFavoritesPosts = (): ThunkResult<Promise<void>> => async (dispatch, getState) => {
  const {
    posts: { posts },
    personal: { favorites },
  } = getState();

  const postsToDownloadId = favorites.reduce((postIds, id) => {
    !posts[id] && postIds.push(id);
    return postIds;
  }, [] as string[]);

  const postsDownloaded: PostsCollection = {};
  await Promise.all(
    postsToDownloadId.map(async postId => {
      const ref = firebase.database().ref(`posts/${postId}`);
      const snapshot = await ref.once('value');
      postsDownloaded[postId] = snapshot.val();
    })
  );

  dispatch(addPosts(postsDownloaded));
};

export { createPost, getPostsByCategory, getFavoritesPosts };
