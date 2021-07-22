import React from "react";
import { Box, makeStyles, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  tablet_viewport,
} from "../../config";
import SearchBar from "../SearchBar";
import MediaControlCard from "../MediaControlCard";
import MapIcon from "../../assets/icons/placeholder-in-a-circle-outline.png";
import clsx from 'clsx'
import { connect } from "react-redux"
import InfoText from "../InfoText";

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
    minWidth: 365,
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

const PlaceListView = ({ jamSessions }) => {
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
        {jamSessions ?
          jamSessions.map((place) => (
            <Box
              className={classes.minimalSpace}
              display="flex"
              flexDirection="row"
              key={place._id}
            >
              <MediaControlCard event={place} key={place.id} />
            </Box>
          ))
          :
          <InfoText content={"Your search returned no places"}></InfoText>}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    jamSessions: state.places.jamSessions
  }
}

export default connect(mapStateToProps, null)(PlaceListView);
