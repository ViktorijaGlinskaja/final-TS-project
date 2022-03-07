import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import LightButton from '../../../components/buttons/light-button';
import BlueButton from '../../../components/buttons/blue-button';

const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: '15px',
  display: 'flex',
  gap: '10px',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
  },
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

const HomePageHero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }}
    >
      <Box>
        <Typography
          variant="h3"
          sx={{
            textTransform: 'uppercase',
            fontWeight: '400',
            marginRight: 1,
            marginLeft: 1,
          }}
        >
          Meet your content magician
        </Typography>
      </Box>
      <StyledBox sx={{ flexDirection: 'column' }}>
        <LightButton onClick={() => navigate('/auth', { state: { tab: 1 } })}>CREATE AN ACCOUNT</LightButton>
        <BlueButton onClick={() => navigate('/auth', { state: { tab: 0 } })}>I ALREADY HAVE AN ACCOUNT</BlueButton>
      </StyledBox>
    </Box>
  );
};

export default HomePageHero;
