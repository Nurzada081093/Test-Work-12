import { createSlice } from '@reduxjs/toolkit';
import { IImageMutation, ValidationError } from '../../types';
import { addImage } from './galleryThunk.ts';
import { RootState } from '../../app/store.ts';

interface InitialProps {
  gallery: IImageMutation[];
  loadings: {
    addImage: boolean;
    getGalleries: boolean;
    deleteImage: boolean;
  },
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
}

export const galleryFromSlice = (state: RootState) => state.gallery.gallery;
export const addErrorFromSlice = (state: RootState) => state.gallery.addError;
export const addLoadingFromSlice = (state: RootState) => state.gallery.loadings.addImage;

const gallerySlice = createSlice({
  name: 'gallery',
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
      .addCase(addImage.rejected, (state, {payload: error}) => {
        state.loadings.addImage = false;
        state.addError = error || null;
      });
  }
});

export const galleryReducer = gallerySlice.reducer;