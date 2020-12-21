import "./App.css";
import { ThemeProvider, Typography } from "@material-ui/core";
import theme from "./theme";
import HomePaper from "./components/HomePaper"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Typography color='primary'>Jammit App</Typography>
      <HomePaper></HomePaper>
    </ThemeProvider>
  );
}

export default App;

