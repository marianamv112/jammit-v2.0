import React from "react";
import jammitLogo from "../../assets/images/Jammit_logo-nobg.png";
import {
  desktop_viewport,
  tablet_viewport,
  mobile_viewport,
} from "../../config";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Paper, Link, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";

const styles = makeStyles((theme) => ({
  background: {
    width: "100%",
    heigth: "100vh",
  },
  logoWrapper: {
    position: "relative",
    [`@media (min-width: ${mobile_viewport}px)`]: {
      maxWidth: "93%",
    },
    [`@media (min-width: ${tablet_viewport}px)`]: {
      maxWidth: "70%",
    },
    [`@media (min-width: ${desktop_viewport}px)`]: {
      maxWidth: "30%",
    },
  },
  logo: {
    maxWidth: "100%",
  },
  "@keyframes color-change": {
    "0%": { color: theme.palette.home.main },
    "50%": { color: theme.palette.home.primary },
    "100%": { color: theme.palette.home.secondary },
  },
  appName: {
    position: "absolute",
    top: "43%",
    left: "15%",
    fontSize: "5rem",
    animation: "$color-change 1s infinite",
    [`@media (max-width: ${mobile_viewport}px)`]: {
      fontSize: "4rem",
      left: "10%",
    },
  },
  loginLink: {
    marginTop: 20,
    color: theme.palette.home.main,
    textDecoration: "none",
    fontFamily: ["Roboto", "sans-serif"].join(","),
    fontSize: "1rem",
    fontWeight: "bold",
  },
  homePaper: {
    width: "90%",
    height: "90vh",
    background: "linear-gradient(#86BFC2 20%, #B4DBDD 87%, #FFFFFF 110%)",
    position: "absolute",
    top: "5%",
    bottom: 0,
    left: "5%",
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
}));

const LandingPage = (props) => {
  const { loggedInUser } = props;
  const classes = styles();
  return (
    <div className={classes.background}>
      <Paper className={classes.homePaper} elevation={6}>
        <div className={classes.logoWrapper}>
          <img
            id="jammit-logo"
            alt="jammit-logo"
            src={jammitLogo}
            className={classes.logo}
          />
          <Typography
            id="jammit-landing-title"
            variant="h2"
            className={classes.appName}
          >
            {"Jammit"}
          </Typography>
        </div>
        {!loggedInUser && (
          <Link
            id="landing-page-link"
            component={RouterLink}
            to="/login"
            className={classes.loginLink}
          >
            Login
          </Link>
        )}
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.currentUser,
  };
};

export default connect(mapStateToProps, null)(LandingPage);
