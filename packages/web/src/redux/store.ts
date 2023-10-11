import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {
  DeveloperDataSlice, FeedbackSlice, LoadingSlice, ProductDataSlice
} from '../types/reducers';
import feedback from './reducers/feedback';
import loading from './reducers/loading';
import productsData from './reducers/productsData';
import developersData from './reducers/developersData';

export const store = configureStore({
  reducer: {
    feedback,
    loading,
    productsData,
    developersData
  }
});

export type ReduxStoreStateType = {
  feedback: FeedbackSlice,
  loading: LoadingSlice,
  productsData: ProductDataSlice,
  developersData: DeveloperDataSlice
};

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<ReduxStoreStateType> = useSelector;

export default store;
