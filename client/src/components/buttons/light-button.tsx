import React from 'react';
import {
  Button, ButtonProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.transparentLight.main,
  color: theme.palette.primary.main,
  '&: hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.dark,
  },
}));

export type LightButtonProps = ButtonProps;

const LightButton: React.FC<LightButtonProps> = ({ children, ...rest }) => (
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

export default LightButton;
