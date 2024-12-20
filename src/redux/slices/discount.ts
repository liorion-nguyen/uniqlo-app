import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import toast from 'react-native-toast-message';
import { envConfig } from '../../../config';
import { DiscountState, DiscountType } from '../../types/redux/discount';

type GetDiscountSuccessAction = PayloadAction<DiscountType[]>;
type GetDiscountFailureAction = PayloadAction<string>;

const initialState: DiscountState = {
  loading: false,
  discounts: [],
  selectedDiscount: null,
  errorMessage: '',
};

export const DiscountSlice = createSlice({
  name: 'discounts',
  initialState,
  reducers: {
    getDiscountRequest: (state: DiscountState) => {
      state.loading = true;
    },
    getDiscountSuccess: (state: DiscountState, action: GetDiscountSuccessAction) => {
      state.loading = false;
      state.discounts = action.payload;
    },
    getDiscountFailure: (state: DiscountState, action: GetDiscountFailureAction) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    selectDiscount: (state: DiscountState, action: PayloadAction<DiscountType>) => {
      state.selectedDiscount = action.payload;
    },
  },
});

export const getDiscount = () => {
  return async (dispatch: any) => {
    try {
      dispatch(DiscountSlice.actions.getDiscountRequest());

      // Gửi yêu cầu đến API
      const result: AxiosResponse<{data: {data: DiscountType[], total: number}}> = await axios.get(
        `${envConfig.serverURL}/discounts/search?limit&page`
      );

      // Kiểm tra kết quả trả về
      if (result.data.data.data && Array.isArray(result.data.data.data)) {
        dispatch(DiscountSlice.actions.getDiscountSuccess(result.data.data.data));
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
      dispatch(DiscountSlice.actions.getDiscountFailure(errorMessage));
    }
  };
};

export const selectDiscount = (discount: DiscountType) => {
  return async (dispatch: any) => {
    dispatch(DiscountSlice.actions.selectDiscount(discount));
  };
};

export const discountReducer = DiscountSlice.reducer;