import React, { useState } from 'react';
import {
  Paper, Tabs, Tab, Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import LoginForm from './auth-page-login-form';
import SignupForm from './auth-page-signup-form';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '20px',
  minHeight: '510px',
  margin: '9vh auto 0',
  backgroundColor: theme.palette.transparentDark.main,

  [theme.breakpoints.down('md')]: {
    width: '300px',
  },
  [theme.breakpoints.up('md')]: {
    width: '350px',
  },
}));

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const TabPanel = (props: TabPanelProps) => {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
};

export type StateType = {
  state: {
    tab: number
  }
};

const AuthContainer: React.FC = () => {
  const { state } = useLocation() as StateType;
  const [value, setValue] = useState(state.tab ?? 0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <StyledPaper>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        <StyledTab label="Log In" />
        <StyledTab label="Sign Up" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <LoginForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignupForm />
      </TabPanel>
    </StyledPaper>
  );
};

export default AuthContainer;
