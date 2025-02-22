import Container from "@mui/material/Container";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { galleryFromSlice, getLoadingFromSlice } from "../gallerySlice.ts";
import { useEffect } from "react";
import { getGallery } from "../galleryThunk.ts";
import Loading from "../../../components/UI/Loading/Loading.tsx";
import { Box } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import GalleryCards from "../components/GalleryCards/GalleryCards.tsx";

const GalleryContainer = () => {
  const gallery = useAppSelector(galleryFromSlice);
  const loading = useAppSelector(getLoadingFromSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGallery());
  }, [dispatch]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
            margin: "30px 0",
          }}
        >
          {gallery.length > 0 ? (
            <GalleryCards galleryImages={gallery} />
          ) : (
            <Typography
              sx={{ fontSize: "50px", margin: "10% 0", textAlign: "center" }}
            >
              Gallery is empty!
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
};

export default GalleryContainer;
