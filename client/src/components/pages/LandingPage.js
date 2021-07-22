import React from "react";
import jammitLogo from "../../assets/images/Jammit_logo-nobg.png";
import configs from "../../config";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Paper, Link, makeStyles, Box } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  background: {
    width: "100%",
    height: "100vh",
  },
  logoWrapper: {
    position: "relative"
  },
  logo: {
    maxWidth: "100%",
  },
  "@keyframes color-change": {
    "0%": { color: theme.palette.home.primary },
    "50%": { color: theme.palette.home.main },
    "100%": { color: theme.palette.home.secondary },
  },
  appName: {
    position: "absolute",
    top: "43%",
    left: "15%",
    fontSize: "5rem",
    animation: "$color-change 1s infinite",
    [`@media (max-width: ${configs.mobile_viewport}px)`]: {
      fontSize: "4rem",
      left: "10%",
    },
  },
  loginLink: {
    color: theme.palette.home.main,
    textDecoration: "none",
    fontFamily: ["Roboto", "sans-serif"].join(","),
    fontSize: "1rem",
    fontWeight: "bold",
    position: "absolute",
    top: "90%",
  },
  homePaper: {
    width: "90%",
    height: "90vh",
    background: "linear-gradient(#86BFC2 20%, #B4DBDD 87%, #FFFFFF 110%)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
}));

const LandingPage = () => {

  const classes = styles();
  return (
    <Box className={classes.background} display="flex" justifyContent="center" alignItems="center">
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
        <Link
          id="landing-page-link"
          component={RouterLink}
          to="/login"
          className={classes.loginLink}
        >
          Login
        </Link>
      </Paper>
    </Box>
  );
};


export default LandingPage;
