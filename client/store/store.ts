import {configureStore} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userInfoSlice from './userInfoSlice';
import modalSlice from './modalSlice';

const store = configureStore({
  reducer:{
    userInfo : userInfoSlice,
    openModal : modalSlice,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch //
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector