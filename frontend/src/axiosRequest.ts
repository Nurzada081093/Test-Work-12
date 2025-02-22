import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { apiUrl } from "./globalConstants.ts";
import { Store } from "@reduxjs/toolkit";
import { RootState } from "./app/store.ts";

const axiosRequest = axios.create({
  baseURL: apiUrl,
});

export const addInterceptors = (store: Store<RootState>) => {
  axiosRequest.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = store.getState().users.user?.token;
      const headers = config.headers as AxiosHeaders;
      headers.set("Authorization", token);
      return config;
    },
  );
};

export default axiosRequest;
