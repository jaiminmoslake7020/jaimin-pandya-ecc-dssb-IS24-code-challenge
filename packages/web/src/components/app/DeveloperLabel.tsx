import React from 'react';
import Chip from '@mui/material/Chip';
import {DeveloperName} from '../../types/app';

export type DeveloperLabelPropTypes = {
  developerName:DeveloperName
};

function DeveloperLabel(props: DeveloperLabelPropTypes) {
  const {developerName} = props;
  return (
    developerName
      ? <Chip key={`${developerName}`} label={developerName} variant="outlined" className="w-fit" />
      : <Chip key={`${'NA'}`} label="NA" variant="outlined" />
  );
}

DeveloperLabel.defaultProps = {};

export default DeveloperLabel;
