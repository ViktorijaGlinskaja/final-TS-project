import React from 'react';
import {
  Box,
  Alert,
  AlertTitle,
} from '@mui/material';

const ErrorPage: React.FC = () => (
  <Box sx={{
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }}
  >
    <Alert
      severity="error"
      sx={{
        fontSize: 20, margin: '40vh auto', backgroundColor: 'transparentDark.main', color: 'primary.main', pr: 3,
      }}
    >
      {' '}
      <AlertTitle sx={{ color: 'primray.main' }}>Error 404</AlertTitle>
      You are in the wrong place :(
      {' '}

    </Alert>
  </Box>
);

export default ErrorPage;
