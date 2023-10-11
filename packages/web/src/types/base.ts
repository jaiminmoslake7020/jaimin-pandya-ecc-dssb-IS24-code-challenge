export interface NotificationType {
  id: string,
  type: 'warning' | 'error' | 'info' | 'success',
  title: string,
  message: string,
  caughtError?: any,
  statusCode?: number,
  time?:number,
}

export interface ErrorType extends NotificationType {
  type: 'error',
}

export interface WarningType extends NotificationType {
  type: 'warning',
}

export interface InfoType extends NotificationType {
  type: 'info',
}

export interface SuccessType extends NotificationType {
  type: 'success',
}

export type CoreResponseType = {
  isSuccess: undefined | boolean,
  response: any,
  error: any,
  errorList?: any,
};

export type SuccessResponseType = CoreResponseType & {
  isSuccess: true,
  response: any,
  error: undefined,
  errorList: undefined,
};

export type FailedResponseTypeCore = CoreResponseType & {
  isSuccess: false,
  response: undefined,
  error: undefined | ErrorType,
  errorList?: ErrorType[],
};

export type FailedResponseType = FailedResponseTypeCore & {
  isSuccess: false,
  response: undefined,
  error: ErrorType,
  errorList?: ErrorType[],
};
