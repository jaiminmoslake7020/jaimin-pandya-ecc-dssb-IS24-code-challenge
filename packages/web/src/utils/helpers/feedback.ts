import {
  ErrorType, InfoType, SuccessType, WarningType
} from '../../types/base';
import {getCurrentTime, uuid4} from './string';

const titleBase = 'Error';
const messageBase = 'Something wrong happened! Please try again later.';

export const getNewError = () : ErrorType => ({
  id: uuid4(),
  type: 'error',
  title: titleBase,
  message: messageBase,
  caughtError: undefined,
  statusCode: 0,
  time: getCurrentTime(),
});

export const errorData = getNewError();
// @ts-ignore
export const getNewWarning = () : WarningType => ({
  ...errorData, type: 'warning', id: uuid4(), time: getCurrentTime(), title: 'Warning'
});

// @ts-ignore
export const getNewSuccess = () : SuccessType => ({
  ...errorData, type: 'success', id: uuid4(), time: getCurrentTime(), title: 'Success'
});

export const getNewInfo = () : InfoType => ({
  ...errorData, type: 'info', id: uuid4(), time: getCurrentTime(), title: 'Information'
});

export const addNewWarningMsg = (message:string | undefined = undefined) : WarningType => ({...getNewWarning(), message: message || messageBase});

export const addNewErrorMsg = (message:string | undefined = undefined) : ErrorType => ({...getNewError(), message: message || messageBase});

export const addNewErrorMsgWithTitle = (title:string | undefined = undefined, message:string | undefined = undefined, error: ErrorType | undefined = undefined) : ErrorType => ({...(error || getNewError()), message: message || messageBase, title: title || titleBase});

export const addNewWarningMsgWithTitle = (title:string | undefined = undefined, message:string | undefined = undefined, error: WarningType | undefined = undefined) : WarningType => ({...(error || getNewWarning()), message: message || messageBase, title: title || titleBase});

export const addNewSuccessMsgWithTitle = (title:string | undefined = undefined, message:string | undefined = undefined, error: SuccessType | undefined = undefined) : SuccessType => ({...(error || getNewSuccess()), message: message || messageBase, title: title || titleBase});

export const addNewInfoMsgWithTitle = (title:string | undefined = undefined, message:string | undefined = undefined, error: InfoType | undefined = undefined) : InfoType => ({...(error || getNewInfo()), message: message || messageBase, title: title || titleBase});
