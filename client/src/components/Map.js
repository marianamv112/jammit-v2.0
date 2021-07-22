import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { Box, makeStyles, IconButton } from "@material-ui/core";
import configs from "../config";
import SearchBar from "./SearchBar";
import eventListIcon from "../assets/icons/events_list.png";
import { Link } from "react-router-dom";
import FloatingMediaCard from "../components/FloatingMediaCard";
import pinIcon from "../assets/icons/location_pin_64.png";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setPlaces } from '../redux/actions/placesActions'

const location = {
  address: "Dijon",
  lat: 47.321287336364094,
  lng: 5.037542138835679,
};

const styles = makeStyles((theme) => ({
  googleMap: {
    [`@media (max-width: ${configs.desktop_viewport}px)`]: {
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
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
  },
  iconImage: {
    maxWidth: "100%",
  },
  card: {
    position: "absolute",
    top: "75%",
    width: "70%",
    [`@media (max-width: ${configs.mobile_viewport}px)`]: {
      top: "71%",
    },
  },
}));

const Map = ({ setPlaces, jamSessions }) => {
  /*  const [jamSessions, setJamSessions] = useState(jamPlaces); */
  const [map, setMap] = useState(null);
  const [place, setPlaceSearch] = useState("");
  const [cardVisible, setCardView] = useState(false);
  const [cardPlace, setCardPlace] = useState(null);
  const classes = styles();

  const createMapOptions = (maps) => {
    return {
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    };
  };




  const createMarkers = () => {
    jamSessions && jamSessions.map((jam) => {
      const marker = new window.google.maps.Marker({
        position: {
          lat: jam.latitude,
          lng: jam.longitude,
        },
        icon: pinIcon,
        map: map,
      });
      marker.addListener("click", () => {
        setCardView(!cardVisible);
        setCardPlace(jam);
      });
      // eslint-disable-next-line array-callback-return
      return;
    });
  };

  useEffect(() => {
    if (window.google) {
      createMarkers()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, jamSessions])

  const handleSearch = (placeQuery) => {
    setPlaceSearch(placeQuery);
  };

  const submitSearch = () => {
    if (place) {
      setPlaces(place)
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
        defaultZoom={5}
        center={jamSessions && { lat: jamSessions[0].latitude, lng: jamSessions[1].longitude }}
        zoom={jamSessions && 10}
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
          {cardVisible && cardPlace && <FloatingMediaCard event={cardPlace} switch={() => setCardView(false)} />}
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    jamSessions: state.places.jamSessions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setPlaces,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);