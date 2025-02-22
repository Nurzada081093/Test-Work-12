import './App.css';
import Layout from './components/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import RegisterContainer from './features/users/containers/RegisterContainer/RegisterContainer.tsx';
import LoginContainer from './features/users/containers/LoginContainer/LoginContainer.tsx';
import Typography from '@mui/joy/Typography';
import NewGalleryContainer from './features/gallery/containers/NewGalleryContainer.tsx';
import GalleryContainer from './features/gallery/containers/GalleryContainer.tsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import { useAppSelector } from './app/hooks.ts';
import { userFromSlice } from './features/users/usersSlice.ts';

const App = () => {
  const user = useAppSelector(userFromSlice);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<GalleryContainer/>} />
        <Route path='/addImage' element={
          <ProtectedRoute isAllowed={user && (user.role === 'admin' || user.role === 'user')}>
            <NewGalleryContainer/>
          </ProtectedRoute>
        } />
        <Route path='/register' element={<RegisterContainer/>} />
        <Route path='/login' element={<LoginContainer/>} />
        <Route path='*' element={
          <Typography
            textColor='success.plainColor'
            sx={{ fontWeight: 'md', fontSize: '40px', margin: '10% 0', textAlign: 'center' }}>
              Not found
          </Typography>} />
      </Routes>
    </Layout>
  )
};

export default App;
