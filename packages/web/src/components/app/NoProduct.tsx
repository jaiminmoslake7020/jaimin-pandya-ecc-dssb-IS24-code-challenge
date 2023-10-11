import React from 'react';
import {Link} from 'react-router-dom';

export type NoProductPropTypes = {

};

function NoProduct(props: NoProductPropTypes) {
  return (
    <div>
      <div className="btn-row mb-4 all-apart">
        <Link className="header" to="/">Home</Link>
      </div>
    </div>
  );
}

NoProduct.defaultProps = {};

export default NoProduct;
