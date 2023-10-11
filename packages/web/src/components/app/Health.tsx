import React, {useCallback, useEffect, useState} from 'react';
import {checkHealth} from '../../services/api';
import {addNotification} from '../../redux/reducers/feedback';
import {addNewErrorMsgWithTitle, addNewSuccessMsgWithTitle} from '../../utils/helpers/feedback';
import {useAppDispatch} from '../../redux/store';

export type HealthPropTypes = {

};

function Health(props: HealthPropTypes) {
  const dispatch = useAppDispatch();
  const [healthCheck, setHealthCheck] = useState<boolean>();
  const healthCheckFunction = useCallback(() => {
    checkHealth().then((r) => {
      const { isSuccess, response: data, error } = r;
      if (isSuccess) {
        dispatch(addNotification(addNewSuccessMsgWithTitle('Success', 'Health is OK.')));
      } else if (error && error.id) {
        dispatch(addNotification(error));
      } else {
        const eTwo = addNewErrorMsgWithTitle();
        dispatch(addNotification(eTwo));
      }
    });
  }, []);

  let justOnce = false;
  useEffect(() => {
    if (!healthCheck && !justOnce) {
      justOnce = true;
      setHealthCheck(true);
      healthCheckFunction();
    }
  }, [healthCheck, healthCheckFunction]);

  return (
    <div className="btn-row all-end pb-40 my-10" >
      <button type="button"
        className="btn btn-blue btn-inverse"
        onClick={() => {
          healthCheckFunction();
        }}
      >
        Health Check
      </button>
    </div>
  );
}

Health.defaultProps = {};

export default Health;
