import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const UserPageLayout: React.FC = () => (
  <Box sx={{ backgroundColor: 'primary.main' }}>
    <Outlet />
  </Box>
);

export default UserPageLayout;
