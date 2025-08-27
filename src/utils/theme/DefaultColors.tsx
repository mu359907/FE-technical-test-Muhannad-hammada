const baselightTheme = {
  direction: "ltr",
  palette: {
    primary: {
      main: "#1e88e5",
      light: "#e3f1fc",
      dark: "#1e88e5",
    },
    secondary: {
      main: "#A5DAD1",
      light: "#e1f7f8",
      dark: "#A5DAD1",
    },
    success: {
      main: "#13deb9",
      light: "#E6FFFA",
      dark: "#02b3a9",
      contrastText: "#ffffff",
    },
    info: {
      main: "#7460ee",
      light: "#dedaf9",
      dark: "#1682d4",
      contrastText: "#ffffff",
    },
    error: {
      main: "#FC4B6C",
      light: "#FDEDE8",
      dark: "#f3704d",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ffb22b",
      light: "#FEF5E5",
      dark: "#ae8e59",
      contrastText: "#ffffff",
    },
    purple: {
      A50: "#dedaf9",
      A100: "#6610f2",
      A200: "#557fb9",
    },
    grey: {
      100: "#F2F6FA",
      200: "#EAEFF4",
      300: "#DFE5EF",
      400: "#FFF",
      500: "#5A6A85",
      600: "#2a3547",
    },
    text: {
      primary: "#2a3547",
      secondary: "#2a3547",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "#f6f9fc",
    },
    divider: "#e5eaef",
    background: {
      default: "#fff",
      dark: "#ffffff",
      paper: "#ffffff",
    },
  },
};

const baseDarkTheme = {
  direction: "ltr",
  palette: {
    primary: {
      main: "#1e88e5",
      light: "#d6ecff",
      dark: "#1e88e5",
    },
    secondary: {
      main: "#A5DAD1",
      light: "#1C455D",
      dark: "#A5DAD1",
      bgColor: "#FFF",
    },
    success: {
      main: "#13deb9",
      light: "#1B3C48",
      dark: "#02b3a9",
      contrastText: "#ffffff",
    },
    info: {
      main: "#7460ee",
      light: "#223662",
      dark: "#1682d4",
      contrastText: "#ffffff",
    },
    error: {
      main: "#FC4B6C",
      light: "#4B313D",
      dark: "#f3704d",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ffb22b",
      light: "#4D3A2A",
      dark: "#ae8e59",
      contrastText: "#ffffff",
    },
    purple: {
      A50: "#dedaf9",
      A100: "#6610f2",
      A200: "#557fb9",
    },
    grey: {
      100: "#333F55",
      200: "#465670",
      300: "#FFFFFF",
      400: "#DFE5EF",
      500: "#EAEFF4",
      600: "#F2F6FA",
    },
    text: {
      primary: "#EAEFF4",
      secondary: "#FFFFFF",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "#333F55",
    },
    divider: "#333F55",
    background: {
      default: "#171c23",
      dark: "#171c23",
      paper: "#171c23",
    },
  },
};

export { baseDarkTheme, baselightTheme };
