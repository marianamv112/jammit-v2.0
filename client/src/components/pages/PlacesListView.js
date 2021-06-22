import React, { useState } from "react";
import { Box, makeStyles, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  mobile_viewport,
  tablet_viewport,
  desktop_viewport,
} from "../../config";
import addEventIcon from "../../assets/icons/plus.png";
import editEventIcon from "../../assets/icons/pencil_icon.png";
import SearchBar from "material-ui-search-bar";
import MediaControlCard from "../MediaControlCard";
import lisbon_places from "../../assets/places/places";
import MapIcon from "../../assets/icons/placeholder-in-a-circle-outline.png";
import clsx from 'clsx'

const styles = makeStyles((theme) => ({
  mainContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [`@media (min-width: ${tablet_viewport}px && max-width: ${tablet_viewport}px)`]: {
      marginTop: "1em",
    },
    marginTop: 10,
    marginBottom: 70,
  },
  container: {
    height: "fit-content",
    minwidth: 365,
    maxWidth: 435,
    [`@media (max-width: ${tablet_viewport}px)`]: {
      minWidth: 300,
      maxWidth: 370,
    },
  },
  iconButton: {
    width: 40,
    padding: 0,
    margin: 10,
  },
  iconImage: {
    maxWidth: "100%",
  },
  editIconImage: {
    width: 30,
    padding: 0,
    margin: 10,
  },
  minimalSpace: {
    marginBottom: 10
  },
  extraSpace: {
    marginTop: 20,
    marginBottom: 20,
  },

}));

const PlaceListView = () => {
  const classes = styles();
  const [events, setEvents] = useState(lisbon_places);

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
        flexDirection="column"
        justifyContent="space-between"
        className={classes.container}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          className={clsx(classes.container, classes.extraSpace)}
        >
          <SearchBar
            className={classes.searchBar}
            //value={this.state.value}
            //onChange={(newValue) => this.setState({ value: newValue })}
            //onRequestSearch={() => doSomethingWith(this.state.value)}
          />
          <IconButton
            component={Link}
            to={"/view-map"}
            className={classes.iconButton}
          >
            <img src={MapIcon} alt="map-icon" className={classes.iconImage} />
          </IconButton>
        </Box>
        {/* <Box
          display="flex"
          flexDirection="column"
          className={classes.container}
        > */}
          {events &&
            events.map((event) => (
              <Box
                className={classes.minimalSpace}
                display="flex"
                flexDirection="row"
                key={event.id}
              >
                <MediaControlCard event={event} key={event.id} />
              </Box>
            ))}
        {/* </Box> */}
      </Box>
    </Box>
  );
};

export default PlaceListView;
