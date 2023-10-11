import {Developer, Product} from './app';
import {NotificationType} from './base';

export type LoadingSlice = {
  isLoading: boolean,
  loadingMsg: undefined | string,
  progressPercentage: undefined | number,
  loadingLocation: undefined | string,
};

export type FeedbackSlice = {
  notifications: NotificationType[],
};

export type ProductDataSlice = {
  products: Product[],
};

export type DeveloperDataSlice = {
  developers: Developer[],
};
