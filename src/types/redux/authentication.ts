import { Dayjs } from 'dayjs';

export type AuthenticationState = {
  loading: boolean;
  isAuthenticated: boolean;
  errorMessage: string | null;
  forgotEmailSent: boolean;
  open: string | null;
};

interface Address {
  province: string;
  district: string;
  ward: string;
}

interface Phone {
  country: string;
  number: string;
}

export type RegisterRequestType = {
  email: string;
  fullName: string;
  password: string;
  confirmPassword?: string;
  policy?: boolean;
  dateOfBirth: Dayjs | null;
  address: Address;
  phone: Phone;
};

export type LoginRequestType = {
  email: string;
  password: string;
};

export type LoginResponseType = {
  access_token: string;
  refresh_token?: string;
  authenticated?: string;
};