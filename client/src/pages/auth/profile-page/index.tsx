import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  BoxProps,
} from '@mui/material';
import ProfilePageMenu from './profile-page-menu';
import ProfilePageNavbar from './profile-page-navbar';
import ProfilePageCreatorForm from './profile-page-creator-form';
import ProfilePageSeekerForm from './profile-page-seeker-form';
import ProfilePageMediaForm from './profile-page-media-form';
import { authSelector } from '../../../store/auth';

type TabPanelProps = BoxProps & {
  value: number,
  index: number
};

const TabPanel: React.FC<TabPanelProps> = ({
  children, value, index, ...other
}) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box sx={{ display: 'flex' }}>
        {children}
      </Box>
    )}
  </Box>
);

const ProfilePage: React.FC = () => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const auth = useSelector(authSelector);

  return (
    <Box sx={{ width: '100vw' }}>
      <ProfilePageNavbar />
      <Box sx={{ display: { xs: 'block', sm: 'flex' } }}>
        <ProfilePageMenu pageIndex={pageIndex} setPageIndex={setPageIndex} />

        <Box sx={{
          flexGrow: 1,
          display: 'flex',
          margin: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <TabPanel value={pageIndex} index={0}>
            {auth.user && auth.user.role === 'SEEKER'
              ? <ProfilePageSeekerForm user={auth.user} />
              : <ProfilePageCreatorForm user={auth.user} />}
          </TabPanel>
          <TabPanel value={pageIndex} index={1}>
            <ProfilePageMediaForm />
          </TabPanel>
        </Box>
      </Box>

    </Box>
  );
};

export default ProfilePage;
