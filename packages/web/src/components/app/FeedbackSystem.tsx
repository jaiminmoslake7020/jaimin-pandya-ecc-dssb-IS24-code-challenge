import React, {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import FeedbackList from '../base/FeedbackList';
import {removeNotification} from '../../redux/reducers/feedback';

function FeedbackSystem() {
  const {
    notifications
  } = useAppSelector((store) => store.feedback);
  const dispatch = useAppDispatch();
  const removeFeedbackFunction = useCallback((id:string) => {
    dispatch(removeNotification(id));
  }, []);
  return (
    <div className="notification-wrapper">
      <FeedbackList notifications={notifications} removeItem={removeFeedbackFunction} />
    </div>
  );
}

FeedbackSystem.defaultProps = {};

export default FeedbackSystem;
