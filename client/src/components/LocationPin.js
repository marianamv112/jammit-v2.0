import React from "react";
import pinIcon from "../assets/icons/pin.png";
import { makeStyles, Box, Icon, Typography } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  pin: {
    maxWidth: "100%",
    width: 50,
  },
  pinText: {
    
    color: "black",
  }, 
  pinContainer: {
    maxWidth: 50,
  }

}));

const LocationPin = ({ text }) => {
  const classes = styles();

  return (
    <Box classeName={classes.pinContainer}>
      <Icon>
        <img src={pinIcon} alt="events-list-icon" className={classes.pin} />
      </Icon>
    </Box>
  );
};

export default LocationPin;
