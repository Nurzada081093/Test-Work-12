import { createAsyncThunk } from "@reduxjs/toolkit";
import { IImage, IImageMutation, ValidationError } from "../../types";
import axiosRequest from "../../axiosRequest.ts";
import { isAxiosError } from "axios";

export const addImage = createAsyncThunk<
  void,
  { image: IImage; token: string },
  { rejectValue: ValidationError }
>("gallery/addImage", async ({ image, token }, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    const keys = Object.keys(image) as (keyof IImage)[];

    keys.forEach((key) => {
      const value = image[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosRequest.post("/gallery", formData, {
      headers: { Authorization: token },
    });
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const getGallery = createAsyncThunk<IImageMutation[], void>(
  "gallery/getGallery",
  async () => {
    const response = await axiosRequest("/gallery");
    return response.data || [];
  },
);

export const getAuthorGallery = createAsyncThunk<IImageMutation[], string>(
  "gallery/getAuthorGallery",
  async (authorId) => {
    const response = await axiosRequest(`/gallery?author=${authorId}`);
    return response.data || [];
  },
);

export const deleteImage = createAsyncThunk<
  void,
  { imageId: string; token: string }
>("gallery/deleteImage", async ({ imageId, token }) => {
  await axiosRequest.delete(`/gallery/${imageId}`, {
    headers: { Authorization: token },
  });
});
