import React from 'react';
import {
  TextField, TextFieldProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.transparentLight.main,
  borderRadius: '5px',
  '& input': {
    color: theme.palette.primary.main,
  },
  '& :focus': {
    color: theme.palette.primary.main,
  },
  '& .MuiOutlinedInput-root .MuiInputAdorment-root': { backgroundColor: theme.palette.transparentLight.main },
}
));

export type LightTextFieldProps = TextFieldProps;

const LightTextField: React.FC<LightTextFieldProps> = ({ children, ...rest }) => (
  <StyledTextField
    {...rest}
  >
    {children}
  </StyledTextField>
);

export default LightTextField;
