import { createTheme } from "@material-ui/core";
import "./index.css"

const theme = createTheme({
  root: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#14A7A8",
      info: "#E5E5E5"
    },
    secondary: {
      main: "#F29B7F",
    },
    onPrimary: {
      main: "#000000",
      nav: "#5a5a5a"
    },
    onSecundary: {
      main: "#000000",
    },
    home: {
      main: "#F8169E",
      primary: "#F65B49",
      secondary: "#14A7A8",
    },
  },
  typography: {
    h3: {
      fontFamily: ["Rubik"],
      fontWeight: 700,
      textShadow: "3px 1px #000000",
    },
    h2: {
      fontFamily: ["Rubik"],
      fontWeight: 700,
      textShadow: "4px 2px #000000",
    },
    h1: {
      fontSize: "1.5em",
      fontWeight: "bold",
    },
    caption: {
      color: "rgba(0, 0, 0, 0.54)",
      marginTop: "1em",
    },
    button: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontWeight: 700,
    },
    body1: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontWeight: 400,
    },
    body2: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontWeight: "bold",
    },
  },
});

export default theme;
