import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#262021',
      paper: '#796162',
    },
    primary: {
      main: '#262021',
    },
    secondary: {
      main: '#EDDBDC',
    },
    text: {
      primary: '#ffffff',
      secondary: '#EDDBDC',
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
