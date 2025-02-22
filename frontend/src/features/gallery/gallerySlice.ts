import { createSlice } from "@reduxjs/toolkit";
import { IImageMutation, ValidationError } from "../../types";
import {
  addImage,
  deleteImage,
  getAuthorGallery,
  getGallery,
} from "./galleryThunk.ts";
import { RootState } from "../../app/store.ts";

interface InitialProps {
  gallery: IImageMutation[];
  loadings: {
    addImage: boolean;
    getGalleries: boolean;
    deleteImage: boolean;
  };
  error: boolean;
  addError: ValidationError | null;
}

const initialState: InitialProps = {
  gallery: [],
  loadings: {
    addImage: false,
    getGalleries: false,
    deleteImage: false,
  },
  error: false,
  addError: null,
};

export const galleryFromSlice = (state: RootState) => state.gallery.gallery;
export const addErrorFromSlice = (state: RootState) => state.gallery.addError;
export const addLoadingFromSlice = (state: RootState) =>
  state.gallery.loadings.addImage;
export const getLoadingFromSlice = (state: RootState) =>
  state.gallery.loadings.getGalleries;

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addImage.pending, (state) => {
        state.loadings.addImage = true;
        state.addError = null;
      })
      .addCase(addImage.fulfilled, (state) => {
        state.loadings.addImage = false;
        state.addError = null;
      })
      .addCase(addImage.rejected, (state, { payload: error }) => {
        state.loadings.addImage = false;
        state.addError = error || null;
      })
      .addCase(getGallery.pending, (state) => {
        state.loadings.getGalleries = true;
        state.error = false;
      })
      .addCase(getGallery.fulfilled, (state, { payload: gallery }) => {
        state.loadings.getGalleries = false;
        state.error = false;
        state.gallery = gallery;
      })
      .addCase(getGallery.rejected, (state) => {
        state.loadings.getGalleries = false;
        state.error = true;
      })
      .addCase(getAuthorGallery.pending, (state) => {
        state.loadings.getGalleries = true;
        state.error = false;
      })
      .addCase(getAuthorGallery.fulfilled, (state, { payload: gallery }) => {
        state.loadings.getGalleries = false;
        state.error = false;
        state.gallery = gallery;
      })
      .addCase(getAuthorGallery.rejected, (state) => {
        state.loadings.getGalleries = false;
        state.error = true;
      })
      .addCase(deleteImage.pending, (state) => {
        state.loadings.deleteImage = true;
        state.error = false;
      })
      .addCase(deleteImage.fulfilled, (state) => {
        state.loadings.deleteImage = false;
        state.error = false;
      })
      .addCase(deleteImage.rejected, (state) => {
        state.loadings.deleteImage = false;
        state.error = true;
      });
  },
});

export const galleryReducer = gallerySlice.reducer;
