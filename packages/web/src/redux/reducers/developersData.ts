import {createSlice} from '@reduxjs/toolkit';
import {DeveloperDataSlice} from '../../types/reducers';
import {Developer} from '../../types/app';

const initialState = {
  developers: [],
} as DeveloperDataSlice;

export const feedbackSlice = createSlice({
  name: 'productsData',
  initialState,
  reducers: {
    setDevelopers: (state:DeveloperDataSlice, action) => {
      // eslint-disable-next-line no-param-reassign
      state.developers = action.payload;
    },
    addDeveloper: (state:DeveloperDataSlice, action) => {
      const res = action.payload as Developer;
      state.developers.push(res);
    },
  },
});

export const { actions, reducer } = feedbackSlice;

export const {
  setDevelopers, addDeveloper
} = actions;

export default reducer;
