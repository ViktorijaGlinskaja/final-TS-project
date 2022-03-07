/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Box,
  Typography,
  useMediaQuery,
  styled,
  Tabs,
  Tab,
  tabClasses,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import AuthService from '../../../services/auth-service';
import ProfilePageBackgroundVideo from './components/profile-page-background-video';

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100vh',
  [theme.breakpoints.up('sm')]: {
    width: '300px',
  },
}));

const StyledTabs = styled(Tabs)(() => ({
  overflow: 'visible',
  ripple: 'none',
  display: 'flex',
  marginBottom: '14px',
  '.MuiTabs-scroller': {
    overflow: 'visible !important',
    '.MuiTabs-flexContainer': {
      display: 'flex',
      justifyContent: 'center',
    },
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.primary.main,
  borderTopLeftRadius: '6px',
  borderBottomLeftRadius: '6px',
  fontSize: '0.9rem',
  padding: '12px',
  overflow: 'visible',
  '&:hover': {
    background: 'black',
  },
  '&:focus': {
    background: theme.palette.primary.main,
  },
  '&:active': {
    background: theme.palette.primary.main,
  },
  [`&.${tabClasses.selected}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    '&:before, &:after': {
      position: 'absolute',
      overflow: 'hidden',
      content: '""',
      height: 40,
      width: 40,
      backgroundColor: 'none',
    },
    '&:before': {
      top: -40,
      right: 0,
      borderBottomRightRadius: '7px',
      boxShadow: `${theme.palette.primary.main} 1px 7px 0px 0px`,
    },
    '&:after': {
      bottom: -40,
      right: 0,
      borderTopRightRadius: '7px',
      boxShadow: `${theme.palette.primary.main} 1px -7px 0px 0px`,
    },
  },
}));

const StyledMobileTab = styled(Tab)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.secondary.main,
}));

export type ProfilePageMenuProps = {
  pageIndex: number,
  setPageIndex: (x: number) => void,
};

const ProfilePageMenu: React.FC<ProfilePageMenuProps> = ({
  pageIndex,
  setPageIndex,
}) => {
  const handleLogout = () => {
    AuthService.logout();
  };

  const isSmUp = useMediaQuery((theme: any) => theme.breakpoints.up('sm'));
  const isSmDown = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  const handleChange = (_event: any, newValue: any) => {
    setPageIndex(newValue);
  };

  return (
    <Box sx={{
      display: 'block', height: '100%',
    }}
    >
      {isSmUp && (
        <StyledBox>
          <ProfilePageBackgroundVideo />
          <Box sx={{ position: 'absolute', right: 0, top: '20%' }}>
            <Box sx={{ mr: 2 }}>
              <Typography variant="h5" sx={{ mb: 10 }}> MY PROFILE</Typography>
            </Box>
            <StyledTabs
              orientation="vertical"
              indicatorColor="secondary"
              textColor="secondary"
              value={pageIndex}
              onChange={handleChange}
              TabIndicatorProps={{
                style: {
                  display: 'none',
                },
              }}
            >
              <StyledTab label="Profile details" disableRipple sx={{ mb: 1 }} />
              <StyledTab label="Profile media" disableRipple />
            </StyledTabs>
            <IconButton
              sx={{ position: 'absolute', right: 0, top: '420px' }}
              size="large"
              color="primary"
              onClick={handleLogout}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </StyledBox>
      )}
      {isSmDown && (
        <Box sx={{ display: { xs: 'flex' }, flexDirection: 'column' }}>
          <Typography variant="h2" color="secondary.main" sx={{ margin: 'auto', mt: 6, mb: 2 }}> MY PROFILE</Typography>
          <StyledTabs
            indicatorColor="secondary"
            textColor="secondary"
            value={pageIndex}
            onChange={handleChange}
          >
            <StyledMobileTab label="Profile details" disableRipple />
            <StyledMobileTab label="Profile media" disableRipple />
          </StyledTabs>
        </Box>
      )}
    </Box>
  );
};

export default ProfilePageMenu;
