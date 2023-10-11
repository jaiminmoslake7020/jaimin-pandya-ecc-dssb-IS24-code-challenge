import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import Icon from './Icon';
import {NotificationType} from '../../types/base';

type ErrorBoxProps = {
  notification: NotificationType,
  remove: Function,
  showRealError?: boolean,
};

function Feedback(props:ErrorBoxProps) {
  const { notification, remove, showRealError, } = props;
  const {
    id, message, title, caughtError, type,
  } = notification;

  useEffect(() => {
    setTimeout(() => {
      remove();
    }, 5000);
  }, []);

  return (
    <div data-cypress-id="error-box" id={id} className="component error-box w-full" >
      <div
        className={`w-[95%] wrapper py-2 px-2 mt-4 mr-4 ml-4 ${type === 'error' ? 'bg-red-500' : ' '} ${type === 'warning' ? 'bg-yellow-500' : ' '} ${type === 'info' ? 'bg-blue-500' : ' '} ${type === 'success' ? 'bg-green-500' : ' '} items-center text-slate-50 leading-none lg:rounded-full flex lg:inline-flex ${type}`}
        role="alert"
      >
        <span data-cypress-id="type" className={`type-holder flex rounded-full ${type === 'error' ? 'bg-red-500' : ' '} ${type === 'warning' ? 'bg-yellow-500' : ' '} ${type === 'info' ? 'bg-blue-500' : ' '} ${type === 'success' ? 'bg-green-500' : ' '} uppercase px-2 py-1 text-xs font-bold mr-3 `}>{type}</span>
        <span
          data-cypress-id="data"
          className="message-holder font-semibold mr-2 text-left flex-auto"
        >
          <b>
            {title}
            :
          </b>
          &nbsp;&nbsp;
          {showRealError && typeof caughtError === 'string' ? caughtError : message}
        </span>
        <Button data-cypress-id="remove-btn" onClick={() => { remove(); }} className={`remove-btn flex text-white rounded-full ${type === 'error' ? 'bg-red-500' : ' '} ${type === 'warning' ? 'bg-yellow-500' : ' '} ${type === 'info' ? 'bg-blue-500' : ' '} ${type === 'success' ? 'bg-green-500' : ' '} uppercase py-1 mr-2 cursor-pointer`}><Icon icon="times" /></Button>
      </div>
    </div>
  );
}

Feedback.defaultProps = {
  showRealError: false,
}

export default Feedback;
