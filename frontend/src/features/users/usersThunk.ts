import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import {
  GlobalError,
  IUser,
  UserLogin,
  UserLoginResponse,
  UserRegister,
  ValidationError
} from '../../types';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store.ts';

export const googleLoginOrRegisterUser = createAsyncThunk<IUser, string, {rejectValue: GlobalError}>(
  'users/googleLoginOrRegisterUser',
  async (credential, {rejectWithValue}) => {
    try {
      const response = await axiosRequest.post<UserLoginResponse>('/users/google', {credential});
      return response.data.user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data as GlobalError);
      }
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk<IUser, UserRegister, {rejectValue: ValidationError}>(
  'users/registerUser',
  async (user, {rejectWithValue}) => {
    try {
      const formData = new FormData();

      const keys = Object.keys(user) as (keyof UserRegister)[];

      keys.forEach((key) => {
        const value = user[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });

      const response = await axiosRequest.post<IUser>('/users/register', formData);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk<IUser, UserLogin, {rejectValue: GlobalError}>(
  'users/loginUser',
  async (user, {rejectWithValue}) => {
    try {
      const response = await axiosRequest.post<UserLoginResponse>('/users/sessions', {...user});
      return response.data.user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data as GlobalError);
      }
      throw error;
    }
  }
);

export const logoutUser = createAsyncThunk<void, void, {state: RootState}>(
  "users/logoutUser",
  async (_, {getState}) => {
    const token = getState().users.user?.token;
    await axiosRequest.delete(`users/sessions/`, {headers: {'Authorization': token}});
  }
);