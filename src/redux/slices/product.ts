import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import toast from 'react-native-toast-message';
import { envConfig } from '../../../config';
import { ProductState, ProductType } from '../../types/redux/product';

type GetProductsSuccessAction = PayloadAction<ProductType[]>;
type GetProductSuccessAction = PayloadAction<ProductType>;
type GetProductFailureAction = PayloadAction<string>;
type GetFavoriteSuccessAction = PayloadAction<ProductType[]>;
const initialState: ProductState = {
  loading: false,
  products: [],
  product: null,
  favorites: [],
  errorMessage: '',
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProductRequest: (state: ProductState) => {
      state.loading = true;
    },
    getProductsSuccess: (state: ProductState, action: GetProductsSuccessAction) => {
      state.loading = false;
      state.products = action.payload;
    },
    getProductFailure: (state: ProductState, action: GetProductFailureAction) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    getProductSuccess: (state: ProductState, action: GetProductSuccessAction) => {
      state.loading = false;
      state.product = action.payload;
    },
    createReviewSuccess: (state: ProductState) => {
      state.loading = false;
    },
    getFavoriteSuccess: (state: ProductState, action: GetFavoriteSuccessAction) => {
      state.loading = false;
      state.favorites = action.payload;
    },
  },
});

export const getProducts = () => {
  return async (dispatch: any) => {
    try {
      dispatch(productSlice.actions.getProductRequest());
      const result: AxiosResponse<ProductType[]> = await axios.get(
        `${envConfig.serverURL}/products`
      );
      if (result.data && Array.isArray(result.data)) {
        dispatch(productSlice.actions.getProductsSuccess(result.data));
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Something went wrong';
      toast.show({
        text1: errorMessage,
        type: 'error',
      });
      dispatch(productSlice.actions.getProductFailure(errorMessage));
    }
  };
};

export const getProduct = (productId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(productSlice.actions.getProductRequest());
      const result: AxiosResponse<ProductType> = await axios.get(
        `${envConfig.serverURL}/products/${productId}`
      );
      if (result.data) {
        dispatch(productSlice.actions.getProductSuccess(result.data));
        return result.data;
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Something went wrong';
      toast.show({
        text1: errorMessage,
        type: 'error',
      });
      dispatch(productSlice.actions.getProductFailure(errorMessage));
    }
  };
};

export const createReviewProduct = (review: string, rating: number, id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(productSlice.actions.getProductRequest());
      await axios.post(`${envConfig.serverURL}/reviews/${id}`, {
        reviewText: review,
        rating: rating,
      });
      dispatch(productSlice.actions.createReviewSuccess());
      toast.show({
        text1: 'Review created successfully',
        type: 'success',
      });
      dispatch(getProduct(id));
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Something went wrong';
      toast.show({
        text1: errorMessage,
        type: 'error',
      });
      dispatch(productSlice.actions.getProductFailure(errorMessage));
    }
  };
};

export const deleteReviewProduct = (id: string, productId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(productSlice.actions.getProductRequest());
      await axios.delete(`${envConfig.serverURL}/reviews/${id}`);
      dispatch(productSlice.actions.createReviewSuccess());
      toast.show({
        text1: 'Review deleted successfully',
        type: 'success',
      });
      dispatch(getProduct(productId));
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Something went wrong';
      toast.show({
        text1: errorMessage,
        type: 'error',
      });
      dispatch(productSlice.actions.getProductFailure(errorMessage));
    }
  };
};

export const Favorite = (type: string, productId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(productSlice.actions.getProductRequest());
      await axios.put(`${envConfig.serverURL}/products/favorite/${type}/${productId}`);
      dispatch(productSlice.actions.createReviewSuccess());
      toast.show({
        text1: type === 'add' ? `Add favorite successfully` : `Remove favorite successfully`,
        type: 'success',
      });
      dispatch(getProduct(productId));
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Something went wrong';
      toast.show({
        text1: errorMessage,
        type: 'error',
      });
      dispatch(productSlice.actions.getProductFailure(errorMessage));
    }
  };
};

export const getFavorite = () => {
  return async (dispatch: any) => {
    try {
      dispatch(productSlice.actions.getProductRequest());
      const result: AxiosResponse<ProductType[]> = await axios.get(
        `${envConfig.serverURL}/products/favorite`
      );
      if (result.data && Array.isArray(result.data)) {
        dispatch(productSlice.actions.getFavoriteSuccess(result.data));
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Something went wrong';
      toast.show({
        text1: errorMessage,
        type: 'error',
      });
      dispatch(productSlice.actions.getProductFailure(errorMessage));
    }
  };
};
export const productReducer = productSlice.reducer;
