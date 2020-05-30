import User from 'src/models/User';

export const setUser = (user: Nullable<User>) =>
  ({
    type: 'personal/SET_USER',
    user,
  } as const);

export const setFavorites = (postIds: string[]) =>
  ({
    type: 'personal/SET_FAVORITES',
    postIds,
  } as const);

export default {
  setUser,
  setFavorites,
};
