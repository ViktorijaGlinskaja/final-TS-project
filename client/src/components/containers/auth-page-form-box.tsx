import React from 'react';
import {
  Box, BoxProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(() => ({
  backgroundColor: 'transparent',
  display: 'flex',
  gap: '0.2rem',
  flexDirection: 'column',
})) as React.FC<BoxProps<'form'>>;

export type AuthFormBoxProps = BoxProps<'form'>;

const AuthFormBox: React.FC<AuthFormBoxProps> = ({ children, ...rest }) => (
  <StyledBox component="form" {...rest}>
    {children}
  </StyledBox>
);

export default AuthFormBox;
