import * as React from 'react';
import {Alert} from '@mui/material';
import {Product} from '../../types/app';
import Form from './Form';

export type ProductViewBoxProps = {
  product:Product
};

export default function ProductViewBox(props:ProductViewBoxProps) {
  const {
    product
  } = props;

  // @ts-ignore
  return (
    product
      ? (
        <Form product={product} />
      ) : <Alert className="mt-4" severity="info" >There is no product with this ID.</Alert>
  )
}
