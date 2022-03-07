import { createTheme } from '@mui/material';
import { responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fffcfb',
      light: '#070C11',
      dark: '#4699C9',
    },
    secondary: {
      main: '#2B6D96',
    },
    transparentLight: {
      main: 'rgba(255, 255, 255, 0.25)',
    },
    transparentDark: {
      main: 'rgba(17, 16, 15, 0.5)',
    },
    transparentBlue: {
      main: 'rgba(70, 153, 201, 0.6)',
    },
    action: {
      disabledBackground: 'rgba(70, 153, 201, 0.45)',
      disabled: '#FFF0EB',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    allVariants: {
      color: '#FFF0EB',
    },
    fontFamily: [
      'Noto Sans Display',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            transition: 'background-color 5000s',
            WebkitTextFillColor: '#FFF0EB',
          },
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
