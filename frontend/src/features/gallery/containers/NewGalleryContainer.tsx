import Container from "@mui/material/Container";
import GalleryForm from "../components/GalleryForm/GalleryForm.tsx";
import { IImage } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { userFromSlice } from "../../users/usersSlice.ts";
import { useNavigate } from "react-router-dom";
import { addImage } from "../galleryThunk.ts";
import { toast } from "react-toastify";

const NewGalleryContainer = () => {
  const user = useAppSelector(userFromSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addImageToGallery = async (image: IImage) => {
    if (user) {
      await dispatch(addImage({ image, token: user.token })).unwrap();
      toast.success("Image was successfully added to gallery!");
      navigate("/");
    }
    console.log(image);
  };

  return (
    <Container>
      <GalleryForm addImageToGallery={addImageToGallery} />
    </Container>
  );
};

export default NewGalleryContainer;
