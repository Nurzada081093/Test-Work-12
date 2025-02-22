import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { galleryFromSlice, getLoadingFromSlice } from '../gallerySlice.ts';
import { useEffect } from 'react';
import { getAuthorGallery } from '../galleryThunk.ts';
import Container from '@mui/material/Container';
import Loading from '../../../components/UI/Loading/Loading.tsx';
import { userFromSlice } from '../../users/usersSlice.ts';
import { Box } from '@mui/joy';
import { Button } from '@mui/material';
import Typography from '@mui/joy/Typography';
import AuthorGalleryCards from '../components/AuthorGalleryCards/AuthorGalleryCards.tsx';

const MyGalleryContainer = () => {
  const user = useAppSelector(userFromSlice);
  const gallery = useAppSelector(galleryFromSlice);
  const loading = useAppSelector(getLoadingFromSlice);
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getAuthorGallery(id)).unwrap();
    }
  }, [dispatch, id]);

  return (
    <Container>
      {loading ? <Loading/> :
        <>
          {user && gallery.length > 0 && gallery[0].user && user._id === gallery[0].user._id ?
            <Box sx={{display: 'flex', justifyContent: 'end', alignItems: 'center', marginTop: '20px'}}>
              <Button  variant="contained" onClick={() => navigate('/addImage')}>Add new image</Button>
            </Box> : null
          }
          {gallery.length > 0 ?
            <>
              <Typography level="h1" sx={{margin: '30px 0', textAlign: 'center'}}>{`${gallery[0].user.displayName}\'s gallery`}</Typography>
              <AuthorGalleryCards authorGalleryImages={gallery}/>
            </>
            :
            <Typography sx={{ fontSize: '50px', margin: '15% 0', textAlign: 'center'}}>
              Your gallery is empty. Please add some images to your gallery!
            </Typography>}
        </>
      }
    </Container>
  );
};

export default MyGalleryContainer;
