import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import MapSection from "../Map";

const styles = makeStyles((theme) => ({
  container: {
    minHeight: "95vh",
  },
}));

const MapView = (props) => {
  const classes = styles();

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      className={classes.container}
    >
      <MapSection />
    </Box>
  );
};

export default MapView;
