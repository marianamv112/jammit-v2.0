import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import LandingPage from "./components/pages/LandingPage";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import { connect } from "react-redux";
import WelcomePage from "./components/pages/WelcomePage";
import Profile from "./components/pages/Profile";
import EditProfile from "./components/pages/EditProfile";
import Navbar from "./components/Navbar";
import UserEvents from "./components/pages/UserEvents";
import NewEvent from "./components/pages/NewEvent";
import EditEvent from "./components/pages/EditEvent";
import ViewEvent from "./components/pages/ViewEvent";
import MapView from "./components/pages/MapView";
import EventsListView from "./components/pages/EventsListView"
import PlacesListView from "./components/pages/PlacesListView"


function App({ loggedInUser }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route
            exact
            path="/login"
            render={() =>
              loggedInUser ? <Redirect to="/profile" /> : <LoginPage />
            }
          />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/confirm/:confirmationCode" component={WelcomePage} />
          <Route
            path="/profile"
            render={() => (loggedInUser ? <Profile /> : <Redirect to="/" />)}
          />
          <Route
            path="/edit-profile"
            render={() =>
              loggedInUser ? <EditProfile /> : <Redirect to="/" />
            }
          />
          <Route
            path="/user-events/:userId"
            render={() => (loggedInUser ? <UserEvents /> : <Redirect to="/" />)}
          />
          <Route
            path="/new-event"
            render={() => (loggedInUser ? <NewEvent /> : <Redirect to="/" />)}
          />
          <Route
            path="/edit-event/:eventId"
            render={() => (loggedInUser ? <EditEvent /> : <Redirect to="/" />)}
          />
          <Route
            path="/view-event/:eventId"
            render={() => (loggedInUser ? <ViewEvent /> : <Redirect to="/" />)}
          />
          <Route
            path="/view-map"
            render={() => (loggedInUser ? <MapView /> : <Redirect to="/" />)}
          />
          <Route
            path="/view-places-list"
            render={() => (loggedInUser ? <PlacesListView /> : <Redirect to="/" />)}
          />
          <Route
            path="/all-events"
            render={() => (loggedInUser ? <EventsListView /> : <Redirect to="/" />)}
          />
        </Switch>
        {loggedInUser && <Navbar />}
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
