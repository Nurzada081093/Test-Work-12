import { IImageMutation } from '../../../../types';
import React from 'react';
import AuthorGalleryCard from './AuthorGalleryCard/AuthorGalleryCard.tsx';
import Box from '@mui/joy/Box';

interface Props {
  authorGalleryImages: IImageMutation[];
}

const AuthorGalleryCards:React.FC<Props> = ({authorGalleryImages}) => {
  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'}}>
      {authorGalleryImages.map((authorGalleryImage) => (
        <AuthorGalleryCard key={authorGalleryImage._id} authorGalleryImage={authorGalleryImage}/>
      ))}
    </Box>
  );
};

export default AuthorGalleryCards;