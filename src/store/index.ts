import { applyMiddleware, compose, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer from 'src/store/reducer';
import { RootState } from 'src/store/types';
import categories from 'src/data/categories';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const devtools = (window as any)?.__REDUX_DEVTOOLS_EXTENSION__();

const initialState: RootState = {
  posts: {
    posts: {},
    categories,
  },
  personal: {
    user: null,
    posts: [],
    favorites: [],
  },
  modal: {
    auth: { isShow: false },
  },
};

// Unique symbol here to avoid default value for generic type
// ThunkMiddleware type will be combined with passed to reducer action types
const thunkMiddleware: ThunkMiddleware<RootState, { readonly type: unique symbol }> = thunk;

const store = createStore(rootReducer, initialState, compose(applyMiddleware(thunkMiddleware)));

export default store;
