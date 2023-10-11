import {
  ErrorType, FailedResponseType, FailedResponseTypeCore, SuccessResponseType
} from '../../types/base';
import {getNewError} from './feedback';

export const coreFailedResponse: FailedResponseTypeCore = {
  isSuccess: false,
  response: undefined,
  error: undefined,
};

export const coreSuccessResponse = {
  isSuccess: true,
  response: undefined,
  error: undefined,
} as SuccessResponseType;

// eslint-disable-next-line max-len
export const prepareFailedResponse = (
  e: any,
): Promise<FailedResponseType> => {
  return new Promise((resolve) => {
    const {
      message,
    } = e;
    let newError = getNewError();
    newError = {
      ...newError,
      message: `Sorry, something's wrong, pls retry. "${message}"`,
    } as ErrorType;
    if (e) {
      newError = {
        ...newError,
        caughtError: e,
      } as ErrorType;
    }
    let failedResponse = coreFailedResponse;
    // eslint-disable-next-line max-len
    failedResponse = {
      ...failedResponse,
      error: newError,
    } as FailedResponseType;
    resolve(failedResponse);
  });
};
