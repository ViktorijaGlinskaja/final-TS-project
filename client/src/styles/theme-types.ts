import '@mui/material';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    transparentLight: PaletteColor;
    transparentDark: PaletteColor;
    transparentBlue: PaletteColor;
  }
  interface PaletteOptions {
    transparentLight?: PaletteColorOptions;
    transparentDark?: PaletteColorOptions;
    transparentBlue?: PaletteColorOptions;
  }
}
