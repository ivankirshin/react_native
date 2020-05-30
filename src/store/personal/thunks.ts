import firebase from 'src/firebase';
import User from 'src/models/User';
import { setFavorites, setUser } from 'src/store/personal/actions';
import { ThunkResult } from 'src/store/types';

const signUpWithFirebase = async (email: string, password: string) => {
  try {
    return await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (e) {
    // TODO messages
    switch (e.code) {
      case 'auth/weak-password':
      case 'auth/email-already-in-use':
        throw new Error('This email address is already in use');
      case 'auth/invalid-email':
      case 'auth/operation-not-allowed':
    }
  }
};

const signInWithFirebase = async (email: string, password: string) => {
  try {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (e) {
    // TODO messages
    switch (e.code) {
      case 'auth/user-disabled':
        throw new Error('User is disabled');
      case 'auth/user-not-found':
        throw new Error('User is not found');
      case 'auth/invalid-email':
        throw new Error('Invalid event');
      case 'auth/wrong-password':
        throw new Error('Password is wrong');
      default:
        throw new Error('Sign In failed');
    }
  }
};

const addUserToFirebase = async (userUid: string, name: string, surname: string, email: string) => {
  await firebase
    .database()
    .ref(`users/${userUid}`)
    .set({
      name,
      surname,
      email,
    });

  return new User(userUid, email, name, surname, null, null);
};

const getUserInfoFromFirebase = async (userUid: string) => {
  const snapshot = await firebase
    .database()
    .ref(`users/${userUid}`)
    .once('value');

  const user = snapshot.val();

  return {
    user: new User(userUid, user.email, user.name, user.surname, user.avatar, user.about),
    posts: user.posts ?? {},
    favorites: user.favorites ?? {},
  };
};

const signUp = (name: string, surname: string, email: string, password: string): ThunkResult<Promise<void>> => async dispatch => {
  const userCredential = await signUpWithFirebase(email, password);

  const userUid = userCredential?.user?.uid;
  if (!userUid) throw new Error('Unknown error when creating user');

  const user = await addUserToFirebase(userUid, name, surname, email);
  dispatch(setUser(user));
};

const signIn = (email: string, password: string): ThunkResult<Promise<void>> => async dispatch => {
  const userCredential = await signInWithFirebase(email, password);

  const userUid = userCredential?.user?.uid;
  if (!userUid) throw new Error('Unknown sign in error');

  const { user, posts, favorites } = await getUserInfoFromFirebase(userUid);
  dispatch(setUser(user));
  dispatch(setFavorites(Object.keys(favorites)));
};

const restoreSignStatus = (): ThunkResult<Promise<void>> => async dispatch => {
  const userUid = firebase.auth().currentUser?.uid;
  if (!userUid) return;

  const { user, favorites } = await getUserInfoFromFirebase(userUid);
  dispatch(setUser(user));
  dispatch(setFavorites(Object.keys(favorites)));
};

const signOut = (): ThunkResult<Promise<void>> => async dispatch => {
  await firebase.auth().signOut();
  dispatch(setUser(null));
  dispatch(setFavorites([]));
};

const addFavoritesToFirebase = async (userUid: string, postId: string) => {
  await firebase
    .database()
    .ref(`users/${userUid}/favorites/${postId}`)
    .set(true);
};

const addToFavorites = (postId: string): ThunkResult<Promise<void>> => async (dispatch, getState) => {
  const {
    personal: { user, favorites },
  } = getState();

  if (!user) throw new Error('You should be logged in!');

  await addFavoritesToFirebase(user.id, postId);
  dispatch(setFavorites([...favorites, postId]));
};

const deleteFavoritesFromFirebase = async (userUid: string, postId: string) => {
  await firebase
    .database()
    .ref(`users/${userUid}/favorites`)
    .child(postId)
    .remove();
};

const deleteFromFavorites = (postId: string): ThunkResult<Promise<void>> => async (dispatch, getState) => {
  const {
    personal: { user, favorites },
  } = getState();

  if (!user) throw new Error('You should be logged in!');

  await deleteFavoritesFromFirebase(user.id, postId);
  dispatch(setFavorites(favorites.filter(id => id !== postId)));
};

export { signUp, signIn, signOut, addToFavorites, deleteFromFavorites, restoreSignStatus };
