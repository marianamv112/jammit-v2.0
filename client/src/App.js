import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import LandingPage from "./components/pages/LandingPage";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import { connect } from "react-redux";
import WelcomePage from "./components/pages/WelcomePage";


function App(props) {
  const { loggedInUser } = props;

  return (
    <>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={LoginPage}/>
          <Route path="/signup" component={SignUpPage} />
          <Route path="/confirm/:confirmationCode" component={WelcomePage} />
        </Switch>
      </ThemeProvider>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.currentUser,
  };
};


export default connect(mapStateToProps, null)(App);
