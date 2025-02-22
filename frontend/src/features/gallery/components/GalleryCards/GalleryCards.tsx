import { IImageMutation } from "../../../../types";
import React from "react";
import GalleryCard from "./GalleryCard/GalleryCard.tsx";

interface Props {
  galleryImages: IImageMutation[];
}

const GalleryCards: React.FC<Props> = ({ galleryImages }) => {
  return (
    <>
      {galleryImages.map((galleryImage) => (
        <GalleryCard key={galleryImage._id} galleryImage={galleryImage} />
      ))}
    </>
  );
};

export default GalleryCards;
