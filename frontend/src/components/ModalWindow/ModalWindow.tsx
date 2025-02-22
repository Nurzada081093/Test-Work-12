import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import React from "react";
import { IImageMutation } from "../../types";
import { AspectRatio } from "@mui/joy";
import { apiUrl } from "../../globalConstants.ts";

interface Props {
  openModal: boolean;
  closeModal: () => void;
  galleryImage: IImageMutation;
}

const ModalWindow: React.FC<Props> = ({
  openModal = false,
  closeModal,
  galleryImage,
}) => {
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openModal}
        onClose={closeModal}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: "700px",
            height: "500px",
            borderRadius: "md",
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" />
          <AspectRatio
            minHeight={"500px"}
            maxHeight={"400px"}
            sx={{ borderRadius: "md" }}
          >
            <img
              src={`${apiUrl + "/" + galleryImage.gallery_image}`}
              srcSet={`${apiUrl + "/" + galleryImage.gallery_image}`}
              alt={galleryImage.title}
            />
          </AspectRatio>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
};

export default ModalWindow;
