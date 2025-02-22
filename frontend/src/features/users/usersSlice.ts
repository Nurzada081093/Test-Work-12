import { createSlice } from '@reduxjs/toolkit';
import { GlobalError, IUser, ValidationError } from '../../types';
import { googleLoginOrRegisterUser, loginUser, registerUser } from './usersThunk.ts';
import { RootState } from '../../app/store.ts';

interface UserInitialState {
  user: IUser | null;
  loadingToRegister: boolean;
  errorToRegister: ValidationError | null;
  loadingToLogin: boolean;
  errorToLogin: GlobalError | null;
}

const initialState: UserInitialState = {
  user: null,
  loadingToRegister: false,
  errorToRegister: null,
  loadingToLogin: false,
  errorToLogin: null,
};

export const userFromSlice = (state: RootState) => state.users.user;
export const registerErrorFromSlice = (state: RootState) => state.users.errorToRegister;
export const loginErrorFromSlice = (state: RootState) => state.users.errorToLogin;
export const registerLoadingFromSlice = (state: RootState) => state.users.loadingToRegister;
export const loginLoadingFromSlice = (state: RootState) => state.users.loadingToLogin;

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loadingToRegister = true;
        state.errorToRegister = null;
      })
      .addCase(registerUser.fulfilled, (state,{payload: userRegister}) => {
        state.user = userRegister;
        state.loadingToRegister = false;
        state.errorToRegister = null;
      })
      .addCase(registerUser.rejected, (state, {payload: error}) => {
        state.loadingToRegister = false;
        state.errorToRegister = error || null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loadingToLogin = true;
        state.errorToLogin = null;
      })
      .addCase(loginUser.fulfilled, (state,{payload: user}) => {
        state.user = user;
        state.loadingToLogin = false;
        state.errorToLogin = null;
      })
      .addCase(loginUser.rejected, (state, {payload: error}) => {
        state.loadingToLogin = false;
        state.errorToLogin = error || null;
      })
      .addCase(googleLoginOrRegisterUser.pending, (state) => {
        state.loadingToLogin = true;
        state.errorToLogin = null;
      })
      .addCase(googleLoginOrRegisterUser.fulfilled, (state,{payload: user}) => {
        state.user = user;
        state.loadingToLogin = false;
        state.errorToLogin = null;
      })
      .addCase(googleLoginOrRegisterUser.rejected, (state, {payload: error}) => {
        state.loadingToLogin = false;
        state.errorToLogin = error || null;
      });
  }
});

export const usersReducer = usersSlice.reducer;
export const {clearUser} = usersSlice.actions;

