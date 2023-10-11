import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {removeProps} from '../../utils/helpers/string';

type IconProps = FontAwesomeIconProps & {
  insideBtn?: boolean,
};

function Icon(props : IconProps) {
  /* eslint-disable */
  const { insideBtn, className } = props;
  const [classList, setClassList] = useState<string>(typeof className !== 'undefined' ? className : ' ');

  useEffect(() => {
    if (insideBtn) {
      setClassList(`${classList}  mr-2 pr-0.5 -mt-0.5 ml-1`);
    }
  }, [insideBtn]);

  const remainingProps = removeProps(props, ['insideBtn', 'svgIcon']);
  // @ts-ignore
  const iconsName = remainingProps['icon'] as unknown as IconProp;

  // @ts-ignore
  return (
      Object.keys(remainingProps).includes('icon') && iconsName ?
          <FontAwesomeIcon icon={iconsName} className={classList} {...remainingProps} /> : null
  );
  /* eslint-disable */
}

Icon.defaultProps = {
  insideBtn: false,
};

export default Icon;
