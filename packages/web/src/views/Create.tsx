import React from 'react';
import Header from '../components/app/Header';
import Form from '../components/app/Form';

export type HomePropTypes = {

};

function Create(props: HomePropTypes) {
  return (
    <>
      <Header product={undefined} />
      <h1 className="my-2">Create New Product</h1>
      <Form product={undefined} />
    </>
  );
}

Create.defaultProps = {};

export default Create;
