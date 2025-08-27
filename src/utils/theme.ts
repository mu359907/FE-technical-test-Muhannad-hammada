import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
      dark:"#02376D"
    },
    secondary: {
      main: "#A5DAD1",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
