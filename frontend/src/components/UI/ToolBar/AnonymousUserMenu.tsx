import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {NavLink} from 'react-router-dom';

const AnonymousUserMenu = () => {
  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '250px', margin: '10px'}}>
      <Button
        variant="outlined"
        color={'inherit'}
        to={'/login'}
        component={NavLink}
        sx={{
          width: '100px',
          color: 'transparent',
          backgroundImage: 'linear-gradient(to right, #f83600, #f9d423)',
          WebkitBackgroundClip: 'text',
          fontSize: '17px',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            backgroundPosition: 'right center',
            color: '#fff',
            textShadow: '0px 0px 15px rgba(255, 255, 255, 0.8)',
          },
        }}
      >Sign In</Button>
      <Button
        variant="outlined"
        color={'inherit'}
        to={'/register'}
        component={NavLink}
        sx={{ width: '120px',
          color: 'transparent',
          backgroundImage: 'linear-gradient(to right, #f83600, #f9d423)',
          WebkitBackgroundClip: 'text',
          fontSize: '17px',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            backgroundPosition: 'right center',
            color: '#fff',
            textShadow: '0px 0px 15px rgba(255, 255, 255, 0.8)',
          },
        }}
      >Sign Up</Button>
    </Box>
  );
};

export default AnonymousUserMenu;