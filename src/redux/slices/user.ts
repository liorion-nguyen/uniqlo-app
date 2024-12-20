import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import toast from 'react-native-toast-message';
import { Response } from '../../types/redux/response';
import { UserState, UserType } from '../../types/redux/user';
import { envConfig } from '../../../config';

type GetUserSuccessdAction = PayloadAction<UserType | null>;
type GetUserFailureAction = PayloadAction<string>;

const initialState: UserState = {
  loading: false,
  user: null,
  errorMessage: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserRequest: (state: UserState) => {
      state.loading = true;
    },
    getUserSuccess: (state: UserState, action: GetUserSuccessdAction) => {
      state.loading = false;
      state.user = action.payload;
    },
    getUserFailure: (state: UserState, action: GetUserFailureAction) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    updatePasswordSuccess: (state: UserState) => {
      state.loading = false;
    },
    updateUserSuccess: (state: UserState, action: GetUserSuccessdAction) => {
      state.loading = false;
      state.user = action.payload;
    },
    logout: (state: UserState) => {
      state.user = null;
    }
  },
});

export const getUser = () => {
  return async (dispatch: any) => {
    try {
      dispatch(userSlice.actions.getUserRequest());
      const result: AxiosResponse<Response<UserType>> = await axios.get(`${envConfig.serverURL}/users`);
      dispatch(userSlice.actions.getUserSuccess(result.data.data ? result.data.data : null));
    } catch (error: any) {
      const errorMessage = error.response ? error.response.data.message : 'Something went wrong';
      toast.show({
        text1: errorMessage,
        type: 'error',
      });
      dispatch(userSlice.actions.getUserFailure(errorMessage));
    }
  };
};

export const updateUser = (id: string, user: UserType) => {
  return async (dispatch: any) => {
    try {
      toast.show({
        text1: 'Cập nhật thông tin thành công!',
        type: 'success',
      });
      dispatch(userSlice.actions.getUserRequest());
      const { password, ...userData } = user;
      const result: AxiosResponse<Response<UserType>> = await axios.put(`${envConfig.serverURL}/users/${id}`, userData);
      dispatch(userSlice.actions.updateUserSuccess(result.data.data ? result.data.data : null));
      toast.show({
        text1: 'Cập nhật thông tin thành công!',
        type: 'success',
      });
    } catch (error: any) {
      const errorMessage = error.response ? error.response.data.message : 'Something went wrong';
      toast.show({
        text1: errorMessage,
        type: 'error',
      });
      dispatch(userSlice.actions.getUserFailure(errorMessage));
    }
  }
}

export const changePassword = (oldPassword: string, newPassword: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(userSlice.actions.getUserRequest());
      await axios.post(`${envConfig.serverURL}/users/change-password`, { oldPassword, newPassword });
      toast.show({
        text1: 'Đổi mật khẩu thành công!',
        type: 'success',
      });
      dispatch(userSlice.actions.updatePasswordSuccess());
      return true;
    } catch (error: any) {
      const errorMessage = error.response ? error.response.data.message : 'Có lỗi xảy ra!';
      toast.show({
        text1: errorMessage,
        type: 'error',
      });
      dispatch(userSlice.actions.getUserFailure(errorMessage));
      return false;
    }
  }
}

export const userReducer = userSlice.reducer;