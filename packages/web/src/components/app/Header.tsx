import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Product} from '../../types/app';

export type LinksPropTypes = {
  product: Product | undefined
};

function Header(props: LinksPropTypes) {
  const {
    product
  } = props;

  const p = useLocation();
  const isCreate = p.pathname.indexOf('create') !== -1;

  return (
    <div>
      <div className="btn-row mb-4 all-apart">
        <Link className="header" to="/">Home</Link>
      </div>
      <div className="btn-row justify-end items-end">
        <Link className="btn btn-blue" to="/create">Create New Product</Link>
      </div>
    </div>
  );
}

Header.defaultProps = {};

export default Header;
