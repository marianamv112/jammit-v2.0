import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import LandingPage from "./components/pages/LandingPage";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
      </Switch>
      </ThemeProvider>
    </>
  );
}
export default App;
