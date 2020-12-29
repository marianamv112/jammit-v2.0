import React from "react";
import jammitLogo from "../../assets/images/Jammit_logo-nobg.png";
import clsx from "clsx";
import {
  desktop_viewport,
  tablet_viewport,
  mobile_viewport,
} from "../../config";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Paper, Link, makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  background: {
    width: "100%",
    heigth: "100vh",
  },
  logo: {
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
  animatedItem: {
    animation: `$color-change 1s infinite`,
  },
  "@keyframes color-change": {
    "0%": { color: theme.palette.home.main },
    "50%": { color: theme.palette.home.primary },
    "100%": { color: theme.palette.home.secondary },
  },
  appName: {
    position: "absolute",
    fontSize: "5rem",
    animationName: "slideRight 1s infinite",
    [`@media (min-width: ${mobile_viewport}px)`]: {
      top: "43%",
      left: "16%",
      fontSize: "4rem",
    },
    [`@media (min-width: ${tablet_viewport}px)`]: {
      top: "45%",
      left: "28%",
      fontSize: "5rem",
    },
    [`@media (min-width: ${desktop_viewport}px)`]: {
      top: "40%",
      left: "38%",
      fontSize: "5rem",
    },
  },
  loginLink: {
    marginTop: 20,
    color: theme.palette.home.main,
    textDecoration: "none",
    fontFamily: ['Roboto','sans-serif'].join(','),
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

const LandingPage = ({ theme }) => {
  const classes = styles()
  return (
    <div className={classes.background}>
      <Paper className={classes.homePaper} elevation={6}>
        <img alt="jammit-logo" className={classes.logo} src={jammitLogo} />
        <Link component={RouterLink} to="/login" className={classes.loginLink}>
          Login
        </Link>
      </Paper>
      <Typography variant="h2" className={clsx(classes.animatedItem, classes.appName)}>
        {"Jammit"}
      </Typography>
    </div>
  );
};

export default LandingPage;
