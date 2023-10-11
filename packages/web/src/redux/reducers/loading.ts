import {createSlice} from '@reduxjs/toolkit';
import {LoadingSlice, } from '../../types/reducers';

export const initialState = {
  isLoading: false,
  loadingMsg: undefined,
  progressPercentage: undefined,
  loadingLocation: undefined,
} as LoadingSlice;

export const slice = createSlice({
  name: 'canvasHelperSlice',
  initialState,
  reducers: {
    startLoading: (state:LoadingSlice, action) => {
      // eslint-disable-next-line no-param-reassign,max-len,@typescript-eslint/no-unused-vars
      state.isLoading = action.payload;
      if (!action.payload) {
        // eslint-disable-next-line no-param-reassign,max-len,@typescript-eslint/no-unused-vars
        state.loadingMsg = undefined;
      }
    },
    stopLoading: (state:LoadingSlice) => {
      // eslint-disable-next-line no-param-reassign,max-len,@typescript-eslint/no-unused-vars
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign,max-len,@typescript-eslint/no-unused-vars
      state.loadingMsg = undefined;
      // eslint-disable-next-line no-param-reassign,max-len,@typescript-eslint/no-unused-vars
      state.progressPercentage = undefined;
    },
    setLoadingMsg: (state:LoadingSlice, action) => {
      // eslint-disable-next-line no-param-reassign,max-len,@typescript-eslint/no-unused-vars
      state.isLoading = true;
      // eslint-disable-next-line no-param-reassign,max-len,@typescript-eslint/no-unused-vars
      state.loadingMsg = action.payload;
    },
    setPercentage: (state:LoadingSlice, action) => {
      const { progressPercentage, loadingMsg } = action.payload;
      // eslint-disable-next-line no-param-reassign,max-len,@typescript-eslint/no-unused-vars
      state.isLoading = true;
      // eslint-disable-next-line no-param-reassign,max-len,@typescript-eslint/no-unused-vars
      state.progressPercentage = progressPercentage;
      // eslint-disable-next-line no-param-reassign,max-len,@typescript-eslint/no-unused-vars
      state.loadingMsg = loadingMsg;
    },
  },
});

export const { actions, reducer } = slice;

export const {
  startLoading, stopLoading, setLoadingMsg, setPercentage
} = actions;

export default reducer;
