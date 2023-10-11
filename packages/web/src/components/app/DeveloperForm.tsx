import React, {useCallback, useState} from 'react';
import {TextField} from '@mui/material';
import {Link} from 'react-router-dom';
import {createDeveloper} from '../../services/api';
import {FailedResponseType, SuccessResponseType} from '../../types/base';
import {addNotification} from '../../redux/reducers/feedback';
import {addNewErrorMsgWithTitle} from '../../utils/helpers/feedback';
import {useAppDispatch} from '../../redux/store';
import {addDeveloper} from '../../redux/reducers/developersData';

export type DeveloperFormProps = {
  addDeveloperItem: Function,
};
function DeveloperForm(props: DeveloperFormProps) {
  const {
    addDeveloperItem
  } = props;

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [developerName, setDeveloperName] = useState<string>('');

  const dispatch = useAppDispatch();
  const createDeveloperFunction = useCallback((body:any) => {
    createDeveloper(body).then((r:SuccessResponseType | FailedResponseType) => {
      const { isSuccess, response: data, error } = r;
      if (isSuccess) {
        setDeveloperName('');
        dispatch(addDeveloper(data));
        addDeveloperItem(data.id);
        setOpenForm(false);
      } else if (error && error.id) {
        dispatch(addNotification(error));
        setOpenForm(false);
      } else {
        const eTwo = addNewErrorMsgWithTitle();
        dispatch(addNotification(eTwo));
        setOpenForm(false);
      }
    });
  }, [addDeveloperItem]);

  return (
    <div className="smart-row my-6" >
      {
        openForm
          ? (
            <div className="form-row" >
              <TextField
                label="Developer Name"
                name="developer"
                value={developerName}
                onChange={(e) => {
                  setDeveloperName(e.target.value);
                }}
                fullWidth
                required
              />
              <div className="btn-row all-end">
                <button type="button"
                  className="btn btn-slate"
                  onClick={() => {
                    setDeveloperName('');
                    setOpenForm(false);
                  }}
                >
                  Discard
                </button>
                <button type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    createDeveloperFunction({
                      name: developerName
                    });
                  }}
                >
                  Add New Developer
                </button>
              </div>
            </div>
          )
          : (
            <div className="btn-row all-end">
              <button type="button"
                className="btn btn-slate"
                onClick={() => {
                  setOpenForm(true);
                }}
              >
                Create New Developer
              </button>
            </div>
          )
      }
    </div>
  );
}

DeveloperForm.defaultProps = {};

export default DeveloperForm;
