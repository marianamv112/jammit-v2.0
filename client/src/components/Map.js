import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Box, makeStyles, IconButton } from "@material-ui/core";
import { mobile_viewport, tablet_viewport, desktop_viewport } from "../config";
import SearchBar from "material-ui-search-bar";
import eventListIcon from "../assets/icons/events_list.png";
import lisbon_places from "../assets/places/places";
import LocationPin from "../components/LocationPin";
import { Link } from "react-router-dom";


const location = {
  address: "Lisbon",
  lat: 38.7071,
  lng: -9.13549,
};

const styles = makeStyles((theme) => ({
  googleMap: {
    [`@media (max-width: ${desktop_viewport}px)`]: {
      width: 620,
      height: "92vh",
    },
    position: "relative",
    width: 620,
    height: "80vh",
  },
  searchBar: {
    position: "absolute",
    top: 15,
    left: 15,
  },
  iconButton: {
    width: 40,
  },
  iconImage: {
    maxWidth: "100%",
  },
}));

const Map = () => {
  const [jamSessions, setJamSessions] = useState(lisbon_places);
  const classes = styles();

  return (
    <Box className={classes.googleMap}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_API_KEY,
        }}
        defaultCenter={location}
        defaultZoom={17}
      >
        {jamSessions &&
          jamSessions.map((place) => (
            <LocationPin
              key={place.place_id}
              lat={place.geometry.location.lat}
              lng={place.geometry.location.lng}
              text={place.name}
            />
          ))}
      </GoogleMapReact>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        className={classes.searchBar}
      >
        <SearchBar />
        <IconButton
          component={Link}
          to={"/view-events-list"}
          className={classes.iconButton}
        >
          <img
            src={eventListIcon}
            alt="events-list-icon"
            className={classes.iconImage}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Map;
