import React from "react";
import { makeStyles } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  main: {
    top: "-10%",
    minWidth: "150px",
    height: "0",
    backgroundColor: "aliceblue",
    position: "absolute",
    borderRadius: "50%",
    paddingBottom: "45%",
    width: "45%",
    left: "28%",
  },
}));

const ProfilePic = ({ image }) => {
  const classes = styles();
  return <CardMedia image={image} className={classes.main} />;
};

export default ProfilePic;
