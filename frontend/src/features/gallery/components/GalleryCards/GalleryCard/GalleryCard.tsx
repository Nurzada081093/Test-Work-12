import { IImageMutation } from "../../../../../types";
import React, { useState } from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import Typography from "@mui/joy/Typography";
import { apiUrl } from "../../../../../globalConstants.ts";
import ModalWindow from "../../../../../components/ModalWindow/ModalWindow.tsx";
import { AspectRatio, Avatar, Box, Link } from "@mui/joy";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../../app/hooks.ts";
import { userFromSlice } from "../../../../users/usersSlice.ts";

interface Props {
  galleryImage: IImageMutation;
}

const GalleryCard: React.FC<Props> = ({ galleryImage }) => {
  const [open, setOpen] = useState<boolean>(false);
  const user = useAppSelector(userFromSlice);
  const navigate = useNavigate();

  const deleteTheImage = async (imageId: string) => {
    console.log(imageId);
  };

  return (
    <>
      <ModalWindow
        openModal={open}
        closeModal={() => setOpen(false)}
        galleryImage={galleryImage}
      />
      <Card
        variant="plain"
        sx={{
          width: 300,
          bgcolor: "initial",
          p: 1,
          marginBottom: "50px",
          border: "1px solid lightgrey",
        }}
        onClick={() => setOpen(true)}
      >
        <Box sx={{ position: "relative" }}>
          <AspectRatio ratio="4/3">
            <figure>
              <img
                src={`${apiUrl + "/" + galleryImage.gallery_image}`}
                srcSet={`${apiUrl + "/" + galleryImage.gallery_image}`}
                loading="lazy"
                alt={galleryImage.title}
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
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  flexGrow: 1,
                  alignSelf: "flex-end",
                }}
              >
                <Typography level="h2" noWrap sx={{ fontSize: "lg" }}>
                  <Link
                    overlay
                    underline="none"
                    sx={{
                      color: "#fff",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      display: "block",
                    }}
                  >
                    {galleryImage.title}
                  </Link>
                </Typography>
              </Box>
            </div>
          </CardCover>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {galleryImage.user.googleId === null ? (
            <Avatar
              src={`${apiUrl + "/" + galleryImage.user.avatar}`}
              size="sm"
              sx={{ "--Avatar-size": "2.5rem" }}
            />
          ) : (
            <Avatar
              src={`${galleryImage.user.avatar}`}
              size="sm"
              sx={{ "--Avatar-size": "2.5rem" }}
            />
          )}
          <Link
            onClick={() => navigate(`/authorGallery/${galleryImage.user._id}`)}
            level="body-xs"
            underline="none"
            sx={{
              fontSize: "18px",
              fontWeight: "md",
              marginLeft: "10px",
              color: "text.secondary",
              "&:hover": { color: "danger.plainColor" },
            }}
          >
            {galleryImage.user.displayName}
          </Link>
          {user && user.role === "admin" ? (
            <Button
              variant="outlined"
              sx={{ width: "100px", marginLeft: "auto" }}
              onClick={() => deleteTheImage(galleryImage._id)}
            >
              Delete
            </Button>
          ) : null}
        </Box>
      </Card>
    </>
  );
};

export default GalleryCard;
