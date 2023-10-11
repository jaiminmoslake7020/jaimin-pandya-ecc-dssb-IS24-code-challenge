import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import {Alert} from '@mui/material';
import ProductViewBox from '../components/app/ProductViewBox';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {Product} from '../types/app';
import Header from '../components/app/Header';
import {getProductById} from '../services/api';
import {addNewErrorMsgWithTitle} from '../utils/helpers/feedback';
import {addNotification} from '../redux/reducers/feedback';

export type HomePropTypes = {

};

function View(props: HomePropTypes) {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState<Product | undefined>(undefined);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const mount = () => {
      getProductById(Number(id)).then((responseMain) => {
        const { isSuccess, error, response } = responseMain;
        if (isSuccess && response && response.productId) {
          setProduct(response);
        } else {
          const eTwo = addNewErrorMsgWithTitle();
          dispatch(addNotification(eTwo));
        }
      });
    };
    return mount();
  }, [id]);

  return (
    <>
      <Header product={product} />
      <h1 className="my-2">View Product</h1>
      {product ? <ProductViewBox product={product}/> : <Alert className="mt-4" severity="info" >There is no product with this ID.</Alert> }
    </>
  );
}

View.defaultProps = {};

export default View;
