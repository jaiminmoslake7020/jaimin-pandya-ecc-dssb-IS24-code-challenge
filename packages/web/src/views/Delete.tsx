import React, {useCallback, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Alert} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {deleteProduct} from '../services/api';
import {FailedResponseType, SuccessResponseType} from '../types/base';
import {removeProduct} from '../redux/reducers/productsData';
import {addNotification} from '../redux/reducers/feedback';
import {addNewErrorMsgWithTitle, addNewSuccessMsgWithTitle} from '../utils/helpers/feedback';
import {Product} from '../types/app';
import Header from '../components/app/Header';

export type HomePropTypes = {

};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #eee',
  borderRadius: '12px',
  boxShadow: 24,
  p: 3,
};

function Delete(props: HomePropTypes) {
  const [
    productsLoading, setProductsLoading
  ] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const {
    products
  } = useAppSelector((store) => store.productsData);

  const productArray = products.filter((p:Product) => p.productId === Number(id));
  const product = productArray.length === 1 ? productArray[0] : undefined;
  const { productName } = product || {};

  const deleteProductFunction = useCallback((idProduct:number) => {
    deleteProduct(idProduct).then((r:SuccessResponseType | FailedResponseType) => {
      const { isSuccess, response: data, error } = r;
      console.log('deleteProduct', r);
      if (isSuccess) {
        dispatch(removeProduct(idProduct));
        dispatch(addNotification(addNewSuccessMsgWithTitle('Success', `${productName} has been successfully removed.`)));
        navigate('/');
      } else if (error && error.id) {
        dispatch(addNotification(error));
      } else {
        const eTwo = addNewErrorMsgWithTitle();
        dispatch(addNotification(eTwo));
      }
    });
  }, [productName, navigate]);

  return (
    (product && product.productId)
      ? (
        <Modal
          open
          onClose={() => {
            navigate('/');
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Notice
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to remove this Product
              {' '}
              <strong>{productName}</strong>
              {' '}
              ?
            </Typography>
            <div className="btn-row all-end mt-4 w-full">
              <button type="button"
                className="btn btn-slate"
                onClick={() => {
                  navigate(-1);
                }}>
                No
              </button>
              <button type="button"
                className="btn btn-red"
                onClick={() => {
                  deleteProductFunction(product.productId as number);
                }}>
                Delete
              </button>
            </div>
          </Box>
        </Modal>
      ) : (
        <>
          <Header product={product} />
          <Alert className="mt-4" severity="info" >There is no product with this ID.</Alert>
        </>
      )

  );
}

Delete.defaultProps = {};

export default Delete;
