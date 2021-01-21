import React from "react";
import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  main: {
    top: "-10%",
    left: "20%",
    width: "60%",
    minWidth: "150px",
    height: "0",
    backgroundColor: "aliceblue",
    borderRadius: "50%",
    position: "absolute",
    paddingBottom: "60%",
  },
}));

const ProfilePic = () => {
  const classes = styles();
  return <div className={classes.main}></div>;
};

export default ProfilePic;
