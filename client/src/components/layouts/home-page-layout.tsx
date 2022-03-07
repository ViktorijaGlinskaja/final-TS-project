import React from 'react';
import {
  Box,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import HomePageBackgroundVideo from '../partials/home-page-background-video/home-page-background-video';

const HomePageLayout: React.FC = () => (
  <Box>
    <HomePageBackgroundVideo />
    <Outlet />
  </Box>
);

export default HomePageLayout;
