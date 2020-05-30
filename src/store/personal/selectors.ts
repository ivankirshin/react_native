import { RootState } from 'src/store/types';

export const getUser = (state: RootState) => state.personal.user;

export const getFavorites = (state: RootState) => state.personal.favorites;
