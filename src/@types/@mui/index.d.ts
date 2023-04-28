import '@mui/material/styles';

declare module '@mui/material/styles' {
  // Example of how to extend the theme.
  export interface PaletteOptions {
    custom: {
      icons: {
        delete: string;
        edit: string;
      }
    }
  }

  export interface ThemeOptions {
    palette: {
      custom: {
        icons: {
          delete: string;
          edit: string;
        }
      }
    }
  }
}
