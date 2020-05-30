import { combineReducers } from 'redux';
import modalReducer from 'src/store/modal/reducer';
import personalReducer from 'src/store/personal/reducer';
import postsReducer from 'src/store/posts/reducer';

const rootReducer = combineReducers({
  posts: postsReducer,
  personal: personalReducer,
  modal: modalReducer,
});

export default rootReducer;
