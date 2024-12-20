import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import toast from 'react-native-toast-message';
import { envConfig } from '../../../config';
import { BlogState, BlogType, CommentType } from '../../types/redux/blog';

type GetBlogsSuccessAction = PayloadAction<BlogType[]>;
type GetBlogSuccessAction = PayloadAction<BlogType>;
type GetBlogFailureAction = PayloadAction<string>;

const initialState: BlogState = {
    loading: false,
    blogs: [],
    blog: null,
    errorMessage: '',
};

export const BlogSlice = createSlice({
    name: 'Blog',
    initialState,
    reducers: {
        getBlogRequest: (state: BlogState) => {
            state.loading = true;
        },
        getBlogSuccess: (state: BlogState, action: GetBlogSuccessAction) => {
            state.loading = false;
            state.blog = action.payload;
        },
        getBlogsSuccess: (state: BlogState, action: GetBlogsSuccessAction) => {
            state.loading = false;
            state.blogs = action.payload;
        },
        getBlogFailure: (state: BlogState, action: GetBlogFailureAction) => {
            state.loading = false;
            state.errorMessage = action.payload;
        },
        updateBlogSuccess: (state: BlogState) => {
            state.loading = false;
        },
    },
});

export const getBlogs = () => {
    return async (dispatch: any) => {
        try {
            dispatch(BlogSlice.actions.getBlogRequest());
            const result: AxiosResponse<{ data: BlogType[], total: number }> = await axios.get(
                `${envConfig.serverURL}/blog-details`
            );
            if (result.data && Array.isArray(result.data)) {
                dispatch(BlogSlice.actions.getBlogsSuccess(result.data));
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
            dispatch(BlogSlice.actions.getBlogFailure(errorMessage));
        }
    };
};

export const getBlog = (id: string) => {
    return async (dispatch: any) => {
        try {
            dispatch(BlogSlice.actions.getBlogRequest());
            const result: AxiosResponse<BlogType> = await axios.get(
                `${envConfig.serverURL}/blog-details/${id}`
            );
            dispatch(BlogSlice.actions.getBlogSuccess(result.data));
        } catch (error: any) {
            // Xử lý lỗi
            const errorMessage =
                error.response?.data?.message || error.message || 'Something went wrong';
            toast.show({
                text1: errorMessage,
                type: 'error',
            });
            dispatch(BlogSlice.actions.getBlogFailure(errorMessage));
        }
    };
};

export const sendComment = (id: string, comment: CommentType) => {
    return async (dispatch: any) => {
        try {
            dispatch(BlogSlice.actions.getBlogRequest());
            await axios.post(
                `${envConfig.serverURL}/blog-details/${id}/comments`,
                comment
            );
            dispatch(BlogSlice.actions.updateBlogSuccess());
            toast.show({
                text1: "Thêm bình luận thành công",
                type: "success",
            });
            return true;
        } catch (error: any) {
            // Xử lý lỗi
            const errorMessage =
                error.response?.data?.message || error.message || 'Something went wrong';
            toast.show({
                text1: errorMessage,
                type: 'error',
            });
            dispatch(BlogSlice.actions.getBlogFailure(errorMessage));
            return false;
        }
    };
};

export const blogReducer = BlogSlice.reducer;
