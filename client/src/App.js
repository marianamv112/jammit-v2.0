import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import LandingPage from "./components/pages/LandingPage";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import { connect } from "react-redux";
import WelcomePage from "./components/pages/WelcomePage";
import MainPage from "./components/pages/MainPage";


function App({ loggedInUser }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route
            exact
            path="/login"
            render={() => (loggedInUser ? <Redirect to="/main" /> : <LoginPage />)}
          />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/main" component={MainPage} />
          <Route path="/confirm/:confirmationCode" component={WelcomePage} />
        </Switch>
      </ThemeProvider>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, null)(App);
