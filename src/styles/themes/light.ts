import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    text: {
      primary: '#000000',
      secondary: '#EDDBDC',
    },
    primary: {
      main: '#262021',
    },
    secondary: {
      main: '#EDDBDC',
    },
    background: {
      paper: '#796162',
      default: '#eddbdc',
    },
    error: {
      main: '#6d0000',
    },
    warning: {
      main: '#a69001',
    },
    custom: {
      icons: {
        delete: '#FD7179',
        edit: '#FDFF94',
      },
    },
  },
});
