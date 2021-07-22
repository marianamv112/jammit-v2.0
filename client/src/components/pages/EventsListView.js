import React, { useState, useEffect } from "react";
import { Box, makeStyles, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  tablet_viewport,
} from "../../config";
import addEventIcon from "../../assets/icons/plus.png";
import SearchBar from "../SearchBar";
import MediaControlCard from "../MediaControlCard";
import clsx from 'clsx'
import { getEvents, searchEvent } from "../../services/events"
import InfoText from "../InfoText"

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
    filter: "drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.25))",
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
  searchBar: {
    borderRadius: 10,
    width: "100%"
  }

}));

const EventListView = () => {
  const classes = styles();
  const [events, setEvents] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getEvents().then((res) => {
      setEvents(res.events)
    });
}, []);

const submitSearch = () => {
  if (query !== "") {
    searchEvent(query).then(results => setEvents(results))
  } else {
    getEvents().then((res) => {
      setEvents(res.events)
    });
  }
}


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
          onChange={(e) => setQuery(e.target.value)}
          onClick={() => submitSearch()}
        //onRequestSearch={() => doSomethingWith(this.state.value)}
        />
        <IconButton
          component={Link}
          to="/new-event"
          className={classes.iconButton}
        >
          <img
            src={addEventIcon}
            alt="add-event-icon"
            className={classes.iconImage}
          />
        </IconButton>
      </Box>
      {events ?
        (events.length > 0 ? events.map((event) => (
          <Box
            className={classes.minimalSpace}
            display="flex"
            flexDirection="row"
            key={event._id}
          >
            <MediaControlCard event={event} />
          </Box>
        )) 
        :
          <InfoText content={"No Results"}></InfoText>
        )
        :
        <InfoText content={"Looks like there is no events yet"}></InfoText>
      }
    </Box>
  </Box>
);
};

export default EventListView;
