import {createSlice} from '@reduxjs/toolkit';
import {ProductDataSlice} from '../../types/reducers';
import {Product} from '../../types/app';

const initialState = {
  products: [],
} as ProductDataSlice;

export const feedbackSlice = createSlice({
  name: 'productsData',
  initialState,
  reducers: {
    setProducts: (state:ProductDataSlice, action) => {
      // eslint-disable-next-line no-param-reassign
      state.products = action.payload;
    },
    addProduct: (state:ProductDataSlice, action) => {
      const res = action.payload as Product;
      state.products.push(res);
    },
    updateProduct: (state:ProductDataSlice, action) => {
      const newResults = [] as Array<Product>;
      state.products.forEach((r1: Product) => {
        if ((r1.productId === action.payload.productId)) {
          newResults.push(action.payload);
        } else {
          newResults.push(r1);
        }
      });
      // eslint-disable-next-line no-param-reassign
      state.products = newResults;
    },
    removeProduct: (state:ProductDataSlice, action) => {
      const newResults = [] as Array<Product>;
      state.products.forEach((r1: Product) => {
        if (!(r1.productId === action.payload)) {
          newResults.push(r1);
        }
      });
      // eslint-disable-next-line no-param-reassign
      state.products = newResults;
    },
  },
});

export const { actions, reducer } = feedbackSlice;

export const {
  setProducts, removeProduct, updateProduct, addProduct,
} = actions;

export default reducer;
