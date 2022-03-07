import React from 'react';
import {
  Button, ButtonProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.transparentBlue.main,
  color: theme.palette.primary.main,
}));

export type BlueButtonProps = ButtonProps;

const BlueButton: React.FC<BlueButtonProps> = ({ children, ...rest }) => (
  <StyledButton
    type="submit"
    variant="contained"
    sx={{
      height: '50px', mb: 1, mr: 1, padding: '2',
    }}
    {...rest}
  >
    {children}
  </StyledButton>
);

export default BlueButton;
