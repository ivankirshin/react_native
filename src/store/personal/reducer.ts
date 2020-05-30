import { PersonalActions, PersonalState } from 'src/store/personal/types';

const initialState: PersonalState = {
  user: null,
  favorites: [],
  posts: [],
};

const personalReducer = (state = initialState, action: PersonalActions): PersonalState => {
  switch (action.type) {
    case 'personal/SET_FAVORITES':
      return { ...state, favorites: action.postIds };
    case 'personal/SET_USER':
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default personalReducer;
