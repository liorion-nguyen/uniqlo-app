import { BlogType } from "../types/redux/blog";
import { ProductType } from "../types/redux/product";

export type BottomTabsParams = {
  HomeStack: undefined;
  Setting: undefined;
  Notification: undefined;
  Contact: undefined; 
  Blog: undefined;
};

export type AuthStackParams = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  OTPInput: {
    email: string;
  };
};

export type HomeStackParams = {
  Home: undefined;
  ProductDetail: {
    productId: string;
  };
  Cart: undefined;
  Message: undefined;
  MessageDetail: {
    id: string;
  };
  Discount: undefined;
  CategoryDetail: {
    categoryId: string;
  };
  Categories: undefined;
  Payment: {
    product: ProductType;
  };
};

export type BlogStackParams = {
  PostList: undefined;
  PostDetail: {
    post: BlogType;
  };
};

export type RootStackParams = {
  Auth: undefined;
  TabNav: undefined;
  FillProfile:
  | {
    phone: string;
    password: string;
  }
  | undefined;
  ChangePassword: undefined;
  ResponseForUs: undefined;
  Purchase: {
    purchase: any;
  };
};