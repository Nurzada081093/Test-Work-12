import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks.ts';
import { logoutUser } from '../../../features/users/usersThunk.ts';
import { clearUser } from '../../../features/users/usersSlice.ts';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/joy';
import { apiUrl } from '../../../globalConstants.ts';
import { IUser } from '../../../types';
import Typography from '@mui/material/Typography';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(clearUser());
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "10px 0",
      }}
    >
      {user && (
        <Box sx={{
          marginLeft: '20px',
          marginTop: '10px',
          "&:hover": {
            backgroundPosition: "right center",
            color: "#fff",
            textShadow: "0px 0px 15px rgba(255, 255, 255, 0.8)",
          }
        }} onClick={() => navigate(`/authorGallery/${user._id}`)}>
          <Typography sx={{fontSize: '23px'}}>
            {user.displayName}
          </Typography>
          {user && user.role === 'admin' && (
            <Typography
              variant="caption"
              gutterBottom sx={{ display: 'block', textAlign: 'end' }}
            >
              {user.role}
            </Typography>
          )}
        </Box>
      )}
      <Button
        color="inherit"
        onClick={handleClick}
        sx={{
          marginLeft: "10px",
        }}
      >
        {user && user.googleId ? (
          <Avatar alt={user.displayName} src={user.avatar} size="lg" />
        ) : (
          <Avatar
            alt={user?.displayName}
            src={apiUrl + "/" + user?.avatar}
            size="lg"
          />
        )}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user && user.role === "admin" && (
          <MenuItem
            onClick={() => {
              navigate("/admin");
              setAnchorEl(null);
            }}
          >
            Admin
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            navigate(`/authorGallery/${user._id}`);
            setAnchorEl(null);
          }}
        >
          My gallery
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/addImage");
            setAnchorEl(null);
          }}
        >
          Add new image
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
