import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import toast from 'react-native-toast-message';
import { envConfig } from '../../../config';
import { OrderState } from '../../types/redux/order';
import { OrderType } from '../../types/redux/order';

type GetOrdersSuccessAction = PayloadAction<OrderType[]>;
type GetOrderFailureAction = PayloadAction<string>;
type GetOrderSuccessAction = PayloadAction<OrderType>;
const initialState: OrderState = {
    loading: false,
    orders: [],
    order: null,
    errorMessage: '',
};

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        getOrderRequest: (state: OrderState) => {
            state.loading = true;
        },
        getOrdersSuccess: (state: OrderState, action: GetOrdersSuccessAction) => {
            state.loading = false;
            state.orders = action.payload;
        },
        getOrderFailure: (state: OrderState, action: GetOrderFailureAction) => {
            state.loading = false;
            state.errorMessage = action.payload;
        },
        getOrderSuccess: (state: OrderState, action: GetOrderSuccessAction) => {
            state.loading = false;
            state.order = action.payload;
        },
    },
});

export const getOrders = () => {
    return async (dispatch: any) => {
        try {
            dispatch(orderSlice.actions.getOrderRequest());

            // Gửi yêu cầu đến API
            const result: AxiosResponse<OrderType[]> = await axios.get(
                `${envConfig.serverURL}/orders/search/history`
            );

            // Kiểm tra kết quả trả về
            if (result.data && Array.isArray(result.data)) {
                dispatch(orderSlice.actions.getOrdersSuccess(result.data));
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
            dispatch(orderSlice.actions.getOrderFailure(errorMessage));
        }
    };
};

export const getOrder = (id: string) => {
    return async (dispatch: any) => {
        try {
            dispatch(orderSlice.actions.getOrderRequest());
            const result: AxiosResponse<OrderType> = await axios.get(
                `${envConfig.serverURL}/orders/${id}`
            );
            if (result.data) {
                dispatch(orderSlice.actions.getOrderSuccess(result.data));
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
            dispatch(orderSlice.actions.getOrderFailure(errorMessage));
        }
    };
};

export const createOrder = (order: OrderType) => {
    return async (dispatch: any) => {
        try {
            dispatch(orderSlice.actions.getOrderRequest());
            const result: AxiosResponse<OrderType> = await axios.post(
                `${envConfig.serverURL}/orders`,order
            );
            if (result.data) {
                dispatch(orderSlice.actions.getOrderSuccess(result.data));
                toast.show({
                    text1: 'Order created successfully',
                    type: 'success',
                });
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
            dispatch(orderSlice.actions.getOrderFailure(errorMessage));
        }
    };
};

export const updateStatusOrder = (id: string, status: string) => {
    return async (dispatch: any) => {
        try {
            dispatch(orderSlice.actions.getOrderRequest());
            const result: AxiosResponse<OrderType> = await axios.put(
                `${envConfig.serverURL}/orders/${id}/status`,{ status }
            );
            if (result.data) {
                dispatch(orderSlice.actions.getOrderSuccess(result.data));
                toast.show({
                    text1: 'Order updated successfully',
                    type: 'success',
                });
                dispatch(getOrders());
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
            dispatch(orderSlice.actions.getOrderFailure(errorMessage));
        }
    }
}

export const orderReducer = orderSlice.reducer;
