import React from 'react';
import { Box } from '@mui/material';
import Header from './swipe-page-header';
import SwipeableCards from './swipe-page-cards';

const SwipePage: React.FC = () => (
  <Box sx={{
    position: 'relative',
    overflow: 'hidden',
    height: '100vh',
    width: '100%',
  }}
  >
    <Header />
    <SwipeableCards />
  </Box>
);

export default SwipePage;
