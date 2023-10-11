import {createBrowserRouter, RouterProvider, } from 'react-router-dom';
import {useEffect, useState} from 'react';
import Home from '../views/Home';
import View from '../views/View';
import Delete from '../views/Delete';
import Update from '../views/Update';
import Create from '../views/Create';
import {getDevelopers, getProducts} from '../services/api';
import {FailedResponseType, SuccessResponseType} from '../types/base';
import {addNotification} from '../redux/reducers/feedback';
import {addNewErrorMsgWithTitle} from '../utils/helpers/feedback';
import {useAppDispatch} from '../redux/store';
import {setDevelopers} from '../redux/reducers/developersData';
import {setProducts} from '../redux/reducers/productsData';
import {setLoadingMsg, stopLoading} from '../redux/reducers/loading';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Home />
    ),
  },
  {
    path: '/view/:id',
    element: <View />
  },
  {
    path: '/remove/:id',
    element: <Delete />
  },
  {
    path: '/update/:id',
    element: <Update />
  },
  {
    path: '/create',
    element: <Create />
  },
]);

export default function Routes() {
  const dispatch = useAppDispatch();
  const [loadDevelopers, setDevelopersLoaded] = useState<boolean>(false);
  const [loadProducts, setProductsLoaded] = useState<boolean>(false);

  let onlyOnce = true;
  useEffect(() => {
    const mount = () => {
      if (!loadDevelopers && onlyOnce) {
        onlyOnce = false;
        getDevelopers().then((r:SuccessResponseType | FailedResponseType) => {
          setDevelopersLoaded(true);
          const { isSuccess, response: data, error } = r;
          if (isSuccess) {
            dispatch(setDevelopers(data));
          } else if (error && error.id) {
            dispatch(addNotification(error));
          } else {
            const eTwo = addNewErrorMsgWithTitle();
            dispatch(addNotification(eTwo));
          }
        });
      }
    };
    return mount();
  }, [loadDevelopers])

  let onlyOnceProduct = true;
  useEffect(() => {
    const mount = () => {
      if (!loadProducts && onlyOnceProduct) {
        onlyOnceProduct = false;
        dispatch(setLoadingMsg('Products are being loaded.'));
        getProducts().then((r:SuccessResponseType | FailedResponseType) => {
          setProductsLoaded(true);
          const { isSuccess, response: data, error } = r;
          dispatch(stopLoading());
          if (isSuccess) {
            dispatch(setProducts(data));
          } else if (error && error.id) {
            dispatch(addNotification(error));
          } else {
            const eTwo = addNewErrorMsgWithTitle();
            dispatch(addNotification(eTwo));
          }
        });
      }
    };
    return mount();
  }, [loadProducts])

  return <RouterProvider router={router} />
}
