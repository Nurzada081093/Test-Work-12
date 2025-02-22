import { IImageMutation } from "../../../../../types";
import React, { useState } from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import { apiUrl } from "../../../../../globalConstants.ts";
import Typography from "@mui/joy/Typography";
import { Box } from "@mui/joy";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks.ts";
import { userFromSlice } from "../../../../users/usersSlice.ts";
import ModalWindow from "../../../../../components/ModalWindow/ModalWindow.tsx";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Button from "@mui/material/Button";
import { deleteImage, getAuthorGallery } from "../../../galleryThunk.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

interface Props {
  authorGalleryImage: IImageMutation;
}

const AuthorGalleryCard: React.FC<Props> = ({ authorGalleryImage }) => {
  const [open, setOpen] = useState<boolean>(false);
  const user = useAppSelector(userFromSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deleteLoading, setDeleteLoading] = useState<{
    index: string | null;
    loading: boolean;
  }>({
    index: null,
    loading: false,
  });

  const deleteTheImage = async (imageId: string) => {
    if (user) {
      setDeleteLoading((prevState) => ({
        ...prevState,
        loading: true,
        index: imageId,
      }));
      await dispatch(deleteImage({ imageId, token: user.token })).unwrap();
      await dispatch(getAuthorGallery(user._id)).unwrap();
      if (user.role === "admin") {
        toast.success("Image was successfully deleted by admin!");
        navigate(`/`);
        return;
      }
      toast.success(
        "You have successfully deleted your image in your gallery!",
      );
      navigate(`/authorGallery/${user._id}`);
      setDeleteLoading((prevState) => ({
        ...prevState,
        loading: false,
        index: null,
      }));
    }
  };

  return (
    <>
      <ModalWindow
        openModal={open}
        closeModal={() => setOpen(false)}
        galleryImage={authorGalleryImage}
      />
      <Card
        variant="plain"
        sx={{
          width: 300,
          p: 0,
          margin: "20px",
          position: "relative",
          border: "1px solid lightgrey",
        }}
      >
        <Box
          onClick={() => setOpen(true)}
          sx={{
            position: "relative",
          }}
        >
          <AspectRatio ratio="4/3">
            <figure>
              <img
                src={apiUrl + "/" + authorGalleryImage.gallery_image}
                srcSet={apiUrl + "/" + authorGalleryImage.gallery_image}
                loading="lazy"
                alt={authorGalleryImage.title}
              />
            </figure>
          </AspectRatio>
          <CardCover
            className="gradient-cover"
            sx={{
              "&:hover, &:focus-within": {
                opacity: 1,
              },
              opacity: 0,
              transition: "0.1s ease-in",
              background:
                "linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)",
            }}
          >
            <div>
              <Box
                sx={{
                  p: 2,
                  gap: 1.5,
                  flexGrow: 1,
                  alignSelf: "flex-end",
                }}
              >
                <Typography
                  level="h2"
                  noWrap
                  sx={{ fontSize: "lg", color: "white" }}
                >
                  {authorGalleryImage.title}
                </Typography>
              </Box>
            </div>
          </CardCover>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            padding: "0 10px 10px",
          }}
        >
          {authorGalleryImage.user.googleId === null ? (
            <Avatar
              src={`${apiUrl + "/" + authorGalleryImage.user.avatar}`}
              size="sm"
              sx={{ "--Avatar-size": "2.5rem" }}
            />
          ) : (
            <Avatar
              src={`${authorGalleryImage.user.avatar}`}
              size="sm"
              sx={{ "--Avatar-size": "2.5rem" }}
            />
          )}
          <Typography sx={{ fontSize: "sm", fontWeight: "md" }}>
            {authorGalleryImage.user.displayName}
          </Typography>
          {(user && user._id === authorGalleryImage.user._id) ||
          (user && user.role === "admin") ? (
            <Button
              disabled={
                deleteLoading.loading &&
                authorGalleryImage._id === deleteLoading.index
              }
              variant="outlined"
              sx={{ marginLeft: "auto", width: "150px", fontSize: "14px" }}
              onClick={() => deleteTheImage(authorGalleryImage._id)}
            >
              Delete
              {deleteLoading.loading &&
              authorGalleryImage._id === deleteLoading.index ? (
                <CircularProgress size="20px" sx={{ marginLeft: "5px" }} />
              ) : null}
            </Button>
          ) : null}
        </Box>
      </Card>
    </>
  );
};

export default AuthorGalleryCard;
