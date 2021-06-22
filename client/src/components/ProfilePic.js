import React from "react";
import { makeStyles } from "@material-ui/core";
import { mobile_viewport, tablet_viewport, desktop_viewport } from "../config";
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
    /*     [`@media (min-width: ${desktop_viewport}px)`]: {
      left: "27%",
    },
    [`@media (max-width: ${tablet_viewport}px)`]: {
      left: "25%",
    },
    [`@media (max-width: ${mobile_viewport}px)`]: {
      left: "28%",
    }, */
  },
}));

const ProfilePic = ({ image }) => {
  const classes = styles();
  return <CardMedia image={image} className={classes.main} />;
};

export default ProfilePic;
