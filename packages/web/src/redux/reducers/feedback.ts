import {createSlice} from '@reduxjs/toolkit';
import {FeedbackSlice} from '../../types/reducers';
import {NotificationType} from '../../types/base';

const initialState = {
  notifications: [],
} as FeedbackSlice;

export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    addNotification: (state:FeedbackSlice, action) => {
      let res = action.payload as NotificationType;
      const { caughtError } = res;
      if (caughtError) {
        res = { ...res, caughtError: caughtError.message };
      }
      state.notifications.push(res);
    },
    removeNotification: (state:FeedbackSlice, action) => {
      const newResults = [] as Array<NotificationType>;
      state.notifications.forEach((r1: NotificationType) => {
        if (!(r1.id === action.payload)) {
          newResults.push(r1);
        }
      });
      // eslint-disable-next-line no-param-reassign
      state.notifications = newResults;
    },
  },
});

export const { actions, reducer } = feedbackSlice;

export const {
  addNotification, removeNotification
} = actions;

export default reducer;
