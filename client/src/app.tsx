import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Provider as ReduxProvider } from 'react-redux';
import theme from './styles/theme';
import store from './store';
import PageRouter from './routing/page-router';

const App = () => (
  <ReduxProvider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PageRouter />
    </ThemeProvider>
  </ReduxProvider>
);
export default App;
