import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { createUseStyles } from "react-jss";
import jammitLogo from "../assets/images/Jammit_logo-nobg.png";

const useStyles = createUseStyles({
  homePaper: {
    width: "90%",
    height: "90vh",
    background: "linear-gradient(#86BFC2 20%, #B4DBDD 87%, #FFFFFF 110%)",
    position: "absolute",
    top: "5%",
    bottom: 0,
    left: "5%",
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    minWidth: "33%",
    maxWidth: "63%"
  },
  appName: {
    position: "absolute",
    top: "50%",
    left: "50%",
  }
});

const HomePaper = () => {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.homePaper} elevation={6}>
        <div>
        <img className={classes.logo} src={jammitLogo} />
        <Typography>{'Jammit'}</Typography>
        </div>
      </Paper>
    </>
  );
};

export default HomePaper;
