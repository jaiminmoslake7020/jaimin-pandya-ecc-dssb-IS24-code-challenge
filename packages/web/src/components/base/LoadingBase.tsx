import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export type LoadingProps = {
  align?: undefined,
  loading?: undefined | boolean,
  colorProp?: string,
};

export default function Loading(props:LoadingProps) {
  const { align, loading, colorProp} = props;
  const [loadingRun, setLoadingRun] = useState(true);

  useEffect(() => {
    if (typeof loading === 'undefined') {
      setLoadingRun(true);
    } else if (typeof loading !== 'undefined') {
      setLoadingRun(loading);
    }
  }, [loading])

  return loadingRun
    ? (
      <div className=" loading-box z-30 " >
        <div className=" loading-box-icon-wrapper " >
          <FontAwesomeIcon className="loading-icon" size="5x" icon="spinner" spin color={colorProp || 'purple'} />
        </div>
      </div>
    )
    : null
}
