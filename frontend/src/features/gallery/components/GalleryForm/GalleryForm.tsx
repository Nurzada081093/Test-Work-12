import { Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import FileInput from "../../../../components/FileInput/FileInput.tsx";
import React, { useState } from "react";
import { IImage } from "../../../../types";
import { useAppSelector } from "../../../../app/hooks.ts";
import { addErrorFromSlice, addLoadingFromSlice } from "../../gallerySlice.ts";
import ButtonSpinner from "../../../../components/UI/ButtonSpinner/ButtonSpinner.tsx";
import { toast } from "react-toastify";

interface Props {
  addImageToGallery: (image: IImage) => void;
}

const initialState = {
  title: "",
  gallery_image: null,
};

const GalleryForm: React.FC<Props> = ({ addImageToGallery }) => {
  const [newImageGallery, setNewImageGallery] = useState<IImage>(initialState);
  const addError = useAppSelector(addErrorFromSlice);
  const loading = useAppSelector(addLoadingFromSlice);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewImageGallery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newImageGallery.title.trim().length !== 0) {
      if (!newImageGallery.gallery_image) {
        toast.error("Please select an image!");
        return;
      }
    }

    addImageToGallery({ ...newImageGallery });
    setNewImageGallery({ ...initialState });
  };

  const fileEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setNewImageGallery((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const getError = (fieldName: string) => {
    try {
      return addError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        width: "50%",
        margin: "20px auto",
        padding: "30px 0",
        borderRadius: "20px",
        backgroundColor: "rgba(244,241,241,0.89)",
      }}
    >
      <Typography
        variant="h4"
        sx={{ flexGrow: 1, textAlign: "center", marginBottom: "20px" }}
      >
        Add new image to gallery
      </Typography>
      <Grid container spacing={2} sx={{ mx: "auto", width: "80%" }}>
        <Grid size={12}>
          <TextField
            sx={{ width: "100%" }}
            id="outlined-basic"
            label="Title"
            name="title"
            variant="outlined"
            value={newImageGallery.title}
            onChange={onChange}
            error={Boolean(getError("title"))}
            helperText={getError("title")}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FileInput
            name="gallery_image"
            label="Gallery image"
            onGetFile={fileEventChange}
          />
        </Grid>
        <Grid size={12}>
          <Button
            disabled={loading}
            sx={{ width: "100%" }}
            variant="contained"
            type="submit"
          >
            Create
            {loading ? <ButtonSpinner /> : null}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default GalleryForm;
