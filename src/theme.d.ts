// src/theme.d.ts
import { PaletteOptions } from '@mui/material/styles/createPalette';
import { TypographyPropsVariantOverrides } from '@mui/material/Typography';
import { TypographyVariants, TypographyVariantsOptions } from '@mui/material/styles';
declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    fieldText?: {
      primary?: string;
      secondary?: string;
    };
  }
}

import { Theme as DefaultTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme extends DefaultTheme {
    palette: Palette & {
      fieldText: {
        primary: string;
        secondary: string;
      };
    };
  }

  interface ThemeOptions {
    palette?: PaletteOptions;
  }
}
declare module '@mui/material/styles' {
  interface TypographyVariants {
    body3: React.CSSProperties;
    body4: React.CSSProperties;
    paragraph1: React.CSSProperties;
    paragraph2: React.CSSProperties;
    paragraph3: React.CSSProperties;
  }

  // allow configuration using `createTheme()`
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
    body4?: React.CSSProperties;
    paragraph1?: React.CSSProperties;
    paragraph2?: React.CSSProperties;
    paragraph3?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
    body4: true;
    paragraph1: true;
    paragraph2: true;
    paragraph3: true;
  }
}