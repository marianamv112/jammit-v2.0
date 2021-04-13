import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { Typography, Box, makeStyles } from "@material-ui/core";
import {
  mobile_viewport,
  tablet_viewport,
  desktop_viewport,
} from "../../config";

const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  mainContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [`@media (min-width: ${tablet_viewport}px)`]: {
      marginTop: "1em",
    },
  },
  container: {
    height: "fit-content",
    [`@media (min-width: ${tablet_viewport}px) and (max-width: ${desktop_viewport}px)`]: {
      minWidth: 438,
      maxWidth: 384,
    },
    width: 365,
  },
}));

const mapStyle = {
    width: "50%",
    height: "100%",
};

const containerStyle = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
    width: "100%",
    height: "50%",
  };

const MapView = (props) => {
  const classes = styles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-evenly"
      minHeight={200}
      className={classes.mainContainer}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        className={classes.container}
      >
        <Typography> Map </Typography>
        <Map
          google={props.google}
          zoom={6}
          initialCenter={{ lat: 35.378389, lng: -97.517313 }}
          style={mapStyle}
          containerStyle={containerStyle}
        ></Map>
      </Box>
    </Box>
  );
};

export default GoogleApiWrapper((props) => ({
  apiKey: process.env.REACT_APP_API_KEY,
}))(MapView);
