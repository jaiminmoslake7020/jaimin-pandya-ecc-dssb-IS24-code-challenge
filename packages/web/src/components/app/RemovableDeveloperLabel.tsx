import React from 'react';
import Chip from '@mui/material/Chip';
import {Tooltip} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {addNotification} from '../../redux/reducers/feedback';
import {addNewErrorMsgWithTitle} from '../../utils/helpers/feedback';

export type DeveloperLabelPropTypes = {
  id:string,
  onItemRemoved: Function,
  deletable: boolean
};

function RemovableDeveloperLabel(props: DeveloperLabelPropTypes) {
  const {id, onItemRemoved, deletable} = props;
  const {
    developers
  } = useAppSelector((store) => store.developersData);
  const developerArray = developers.filter((d) => d.id === id);
  const developer = developerArray.length > 0 ? developerArray[0] : undefined;
  const dispatch = useAppDispatch();
  return (
    developer
      ? (
        <Tooltip title={deletable ? 'Remove Developer' : 'Last Developer can not be removed.'}>
          <Chip key={`${id}`}
            label={developer.name}
            className={deletable ? '' : ' cursor-not-allowed '}
            variant="outlined"
            onDelete={() => {
              if (deletable) {
                onItemRemoved();
              } else {
                console.log('addNotification');
                dispatch(addNotification(addNewErrorMsgWithTitle('Validation', 'Last Developer can not be removed.')));
              }
            }}
          />
        </Tooltip>
      )
      : <Chip key={`${id}`} label="NA" variant="outlined" />
  );
}

RemovableDeveloperLabel.defaultProps = {};

export default RemovableDeveloperLabel;
