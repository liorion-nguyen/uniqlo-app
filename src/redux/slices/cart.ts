import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import toast from 'react-native-toast-message';
import { envConfig } from '../../../config';
import { CartState, CartType } from '../../types/redux/cart';

type GetCartSuccessAction = PayloadAction<CartType[]>;
type GetCartFailureAction = PayloadAction<string>;

const initialState: CartState = {
    loading: false,
    carts: [],
    errorMessage: '',
};

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getCartRequest: (state: CartState) => {
            state.loading = true;
        },
        getCartSuccess: (state: CartState, action: GetCartSuccessAction) => {
            state.loading = false;
            state.carts = action.payload;
        },
        getCartFailure: (state: CartState, action: GetCartFailureAction) => {
            state.loading = false;
            state.errorMessage = action.payload;
        },
        updateCartSuccess: (state: CartState) => {
            state.loading = false;
        },
    },
});

export const getCart = () => {
    return async (dispatch: any) => {
        try {
            dispatch(CartSlice.actions.getCartRequest());
            const result: AxiosResponse<{data: CartType[], total: number}> = await axios.get(
                `${envConfig.serverURL}/inventories/search`
            );
            if (result.data.data && Array.isArray(result.data.data)) {
                dispatch(CartSlice.actions.getCartSuccess(result.data.data));
            } else {
                throw new Error('Invalid response format from server');
            }
        } catch (error: any) {
            // Xử lý lỗi
            const errorMessage =
                error.response?.data?.message || error.message || 'Something went wrong';
            toast.show({
                text1: errorMessage,
                type: 'error',
            });
            dispatch(CartSlice.actions.getCartFailure(errorMessage));
        }
    };
};

export const updateCart = (cart: CartType) => {
    return async (dispatch: any) => {
        try {
            dispatch(CartSlice.actions.getCartRequest());
            await axios.put(
                `${envConfig.serverURL}/inventories/${cart._id}`,
                cart
            );
            dispatch(getCart());
            dispatch(CartSlice.actions.updateCartSuccess());
        } catch (error: any) {
            // Xử lý lỗi
            const errorMessage =
                error.response?.data?.message || error.message || 'Something went wrong';
            toast.show({
                text1: errorMessage,
                type: 'error',
            });
            dispatch(CartSlice.actions.getCartFailure(errorMessage));
        }
    };
};

export const deleteCart = (cartId: string) => {
    return async (dispatch: any) => {
        try {
            dispatch(CartSlice.actions.getCartRequest());
            await axios.delete(
                `${envConfig.serverURL}/inventories/${cartId}`,   
            );
            dispatch(getCart());
            dispatch(CartSlice.actions.updateCartSuccess());
        } catch (error: any) {
            // Xử lý lỗi
            const errorMessage =
                error.response?.data?.message || error.message || 'Something went wrong';
            toast.show({
                text1: errorMessage,
                type: 'error',
            });
            dispatch(CartSlice.actions.getCartFailure(errorMessage));
        }
    };
};

export const addCart = (cart: CartType) => {
    return async (dispatch: any) => {
        try {
            dispatch(CartSlice.actions.getCartRequest());
            await axios.post(
                `${envConfig.serverURL}/inventories`,   
                cart
            );
            dispatch(getCart());
            dispatch(CartSlice.actions.updateCartSuccess());
            toast.show({
                text1: "Thêm vào giỏ hàng thành công",
                type: "success",
            });
        } catch (error: any) {
            // Xử lý lỗi
            const errorMessage =
                error.response?.data?.message || error.message || 'Something went wrong';
            toast.show({
                text1: errorMessage,
                type: 'error',
            });
            dispatch(CartSlice.actions.getCartFailure(errorMessage));
        }
    };
};

export const cartReducer = CartSlice.reducer;
