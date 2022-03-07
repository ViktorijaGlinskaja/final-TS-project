import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import ForumIcon from '@mui/icons-material/Forum';
import LogoutIcon from '@mui/icons-material/Logout';
import AuthService from 'services/auth-service';

const Header: React.FC = () => {
  const handleLogout = () => {
    AuthService.logout();
  };
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 100,
      borderBottom: '1px solid #f9f9f9',
    }}
    >
      <IconButton>
        <ForumIcon fontSize="large" />
      </IconButton>
      <Box>
        <Link to="/profile">
          <IconButton>
            <PersonIcon fontSize="large" />
          </IconButton>
        </Link>
        <IconButton onClick={handleLogout}>
          <LogoutIcon fontSize="large" />
        </IconButton>
      </Box>
    </div>
  );
};

export default Header;
