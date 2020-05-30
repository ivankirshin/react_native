// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import store from 'src/store/index';
import { PersonalActions } from 'src/store/personal/types';
import { PostActions } from 'src/store/posts/types';
import rootReducer from 'src/store/reducer';

export type InferActions<T> = T extends { [key: string]: infer U } ? (U extends (...args: any[]) => any ? ReturnType<U> : never) : never;

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;

type Actions = PersonalActions | PostActions;

export type ThunkResult<R = void> = ThunkAction<R, RootState, undefined, Actions>;
