import React from 'react';
import {DeveloperId} from '../../types/app';
import RemovableDeveloperLabel from './RemovableDeveloperLabel';
import DeveloperAutoComplete from './DeveloperAutoComplete';
import {useAppDispatch} from '../../redux/store';
import {addNewWarningMsgWithTitle} from '../../utils/helpers/feedback';
import {addNotification} from '../../redux/reducers/feedback';

export type DeveloperSelectionPropTypes = {
  Developers: string[],
  setDevelopers: Function,
};

function DeveloperSelection(props: DeveloperSelectionPropTypes) {
  const {
    Developers, setDevelopers
  } = props;
  const dispatch = useAppDispatch();
  return (
    <div >
      {
        Developers.length < 5
          ? (
            <div className="mt-2 mb-4">
              <DeveloperAutoComplete
                addItem={(idString:string) => {
                  let alreadyExists = false;
                  Developers.forEach((d:string) => {
                    if (idString === d) {
                      alreadyExists = true;
                    }
                  });
                  if (!alreadyExists) {
                    setDevelopers([...Developers, idString]);
                  } else {
                    dispatch(addNotification(addNewWarningMsgWithTitle('Item Exists', 'Developer has already been selected.')));
                  }
                }}
              />
            </div>
          ) : null
      }
      {Developers.map((d:DeveloperId) => {
        return (
          <RemovableDeveloperLabel
            key={d}
            id={d}
            deletable={Developers.length > 1}
            onItemRemoved={() => {
              const newDevelopers = [] as string[];
              Developers.forEach((idString:string) => {
                if (idString !== d) {
                  newDevelopers.push(idString);
                }
              });
              setDevelopers(newDevelopers);
            }}/>
        )
      })}
    </div>
  );
}

DeveloperSelection.defaultProps = {};

export default DeveloperSelection;
