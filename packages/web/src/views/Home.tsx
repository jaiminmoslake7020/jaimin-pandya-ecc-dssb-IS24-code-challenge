import React from 'react';
import ProductsListTable from '../components/app/ProductsListTable';
import Header from '../components/app/Header';

export type HomePropTypes = {

};

function Home(props: HomePropTypes) {
  return (
    <>
      <Header product={undefined} />
      <ProductsListTable />
    </>
  );
}

Home.defaultProps = {};

export default Home;
