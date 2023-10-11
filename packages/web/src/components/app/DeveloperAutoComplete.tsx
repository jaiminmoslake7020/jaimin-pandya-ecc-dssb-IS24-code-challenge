import * as React from 'react';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import {useAppSelector} from '../../redux/store';
import {Developer} from '../../types/app';

export type DeveloperAutoCompleteProps = {
  addItem: Function,
};

export default function DeveloperAutoComplete(props:DeveloperAutoCompleteProps) {
  const {
    addItem
  } = props;
  const {
    developers,
  } = useAppSelector((store) => store.developersData);
  const [selectedItem, setSelectedItem] = useState<undefined | string>(undefined);
  const developerList = developers.map((d:Developer, index) => {
    return {
      label: `${index + 1} - ${d.name}`,
      value: d.id,
      key: d.id
    }
  });
  return (
    <div className="w-full flex flex-col md:flex-row gap-2">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        onChange={(e:any) => {
          if (e.target.value === undefined) {
            setSelectedItem(undefined);
          }
        }}
        onSelect={(e:any) => {
          const sI = developerList.filter((d) => d.label === e.target.value);
          if (sI.length > 0) {
            setSelectedItem(sI[0].value);
          } else {
            setSelectedItem(undefined);
          }
        }}
        options={developerList}
        renderOption={(propsKl, option) => (
          <Box key={option.value} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...propsKl}>
            {option.label}
          </Box>
        )}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Developer" />}
      />
      <button
        disabled={!selectedItem}
        type="button"
        className="btn btn-slate"
        onClick={() => {
          addItem(selectedItem);
        }} >
        Add
      </button>
    </div>

  );
}
