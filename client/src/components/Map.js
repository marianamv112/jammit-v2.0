import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { Box, makeStyles, IconButton } from "@material-ui/core";
import { mobile_viewport, tablet_viewport, desktop_viewport } from "../config";
import SearchBar from "./SearchBar";
import eventListIcon from "../assets/icons/events_list.png";
import lisbon_places from "../assets/places/places";
import { Link } from "react-router-dom";
import FloatingMediaCard from "../components/FloatingMediaCard";
import pinIcon from "../assets/icons/location_pin_64.png";
import googleSearch from "../services/map";

const location = {
  address: "Lisbon",
  lat: 38.7071,
  lng: -9.13549,
};

const styles = makeStyles((theme) => ({
  googleMap: {
    [`@media (max-width: ${desktop_viewport}px)`]: {
      width: 620,
      height: "95vh",
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
  card: {
    position: "absolute",
    top: "75%",
    width: "70%",
    [`@media (max-width: ${mobile_viewport}px)`]: {
      top: "71%",
    },
  },
}));

const Map = () => {
  const [jamSessions, setJamSessions] = useState(lisbon_places);
  const [map, setMap] = useState(null);
  const [place, setPlaceSearch] = useState("");
  const [cardVisible, setCardView] = useState(false);
  const classes = styles();

  const createMapOptions = (maps) => {
    return {
      //mapTypeControl: false,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    };
  };

  useEffect(() => {
    if (window.google) {
      createMarkers()
    }
  }, [jamSessions])

  const createMarkers = () => {
    jamSessions && jamSessions.map((place) => {
      const marker = new window.google.maps.Marker({
        position: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        },
        icon: pinIcon,
        map: map,
      });
      marker.addListener("click", () => {
        setCardView(!cardVisible);
      });
    });
  };

  const handleSearch = (placeQuery) => {
    setPlaceSearch(placeQuery);
  };

  const submitSearch = () => {
    if (place) {
      googleSearch(place).then((res) => {
        setJamSessions(res)
      });
    }
  };

  return (
    <Box className={classes.googleMap}>
      <GoogleMapReact
        options={createMapOptions}
        bootstrapURLKeys={{
          key: process.env.REACT_APP_API_KEY,
        }}
        onGoogleApiLoaded={({ map, maps }) => {
          setMap(map)
          
        }}
        yesIWantToUseGoogleMapApiInternals
        defaultCenter={location}
        defaultZoom={17}
      ></GoogleMapReact>

      <Box display="flex" flexDirection="column" alignItems="center">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          className={classes.searchBar}
        >
          <SearchBar
            value={place}
            onChange={(e) => handleSearch(e.target.value)}
            onClick={() => submitSearch()}
          />
          <IconButton
            component={Link}
            to={"/view-places-list"}
            className={classes.iconButton}
          >
            <img
              src={eventListIcon}
              alt="events-list-icon"
              className={classes.iconImage}
            />
          </IconButton>
        </Box>
        <Box className={classes.card}>
          {cardVisible && <FloatingMediaCard event={lisbon_places[0]} />}
        </Box>
      </Box>
    </Box>
  );
};

export default Map;
