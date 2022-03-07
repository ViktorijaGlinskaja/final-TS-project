import React from 'react';
import {
  TextField, TextFieldProps,
  alpha,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: '#0b2c40',
  borderRadius: '5px',
  width: '292px',
  '& input': {
    color: theme.palette.primary.main,
  },
  '& :focus': {
    color: theme.palette.primary.main,
  },
  '& .MuiInputLabel-root': {
    color: `${alpha(theme.palette.primary.main, 0.36)}`,
  },
  '& label.Mui-focused': {
    color: theme.palette.primary.main,
  },
  '& input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 100px #0b2c40 inset',
    WebkitTextFillColor: theme.palette.primary.main,
  },
  '& .MuiInputBase-root.MuiFilledInput-root': {
    color: theme.palette.primary.main,
  },
}
));

export type DarkTextFieldProps = TextFieldProps;

const DarkTextField: React.FC<DarkTextFieldProps> = ({ children, ...rest }) => (
  <StyledTextField
    {...rest}
    sx={{ width: { xs: '340px', sm: '360px', md: '400px' } }}
  >
    {children}
  </StyledTextField>
);

export default DarkTextField;
