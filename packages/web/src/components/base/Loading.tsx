import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {ReduxStoreStateType, useAppSelector} from '../../redux/store';
import LoadingBase from './LoadingBase';

export default function Loading() {
  const { loadingMsg, isLoading, progressPercentage } = useAppSelector(
    (store:ReduxStoreStateType) => store.loading
  );
    // console.log('imageUploadInProcess', loadingMsg);
  return (
    isLoading
      ? (
        <>
          {
            loadingMsg ? (
              <div className=" loading-box z-40 " >
                <div className={`  ${progressPercentage ? 'loading-box-icon-wrapper-3' : 'loading-box-icon-wrapper-2'} `} >
                  {
                    progressPercentage
                      ? (
                        <div className="flex flex-col relative z-50">
                          <p className="text-white text-2xl font-bold mb-6 ">{loadingMsg}</p>
                          <div className="w-content flex justify-center  ">
                            <div className="w-24 h-24">
                              <CircularProgress variant="determinate" value={progressPercentage} />
                            </div>
                          </div>
                        </div>
                      )
                      : <p className="text-white text-2xl font-bold ">{loadingMsg}</p>
                  }
                </div>
              </div>
            ) : null
          }
          {
            progressPercentage
              ? null
              : <LoadingBase/>
          }
        </>
      )
      : null
  )
}
