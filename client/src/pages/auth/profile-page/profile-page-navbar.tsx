import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import AuthService from '../../../services/auth-service';

const ProfilePageNavbar: React.FC = () => {
  const handleLogout = () => {
    AuthService.logout();
  };

  return (
    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            onClick={handleLogout}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ProfilePageNavbar;
