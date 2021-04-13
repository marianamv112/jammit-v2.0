import React, { useEffect, useState } from "react";
import {
  Box,
  makeStyles,
  Typography,
  IconButton,
  ButtonBase,
} from "@material-ui/core";
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
import { getUserEvents } from "../../services/events";
import { connect } from "react-redux";

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
    width: "30%",
    display: "flex",
    justifyContent: "space-between",
    [`@media (max-width: ${mobile_viewport}px)`]: {
      minWidth: 365,
    },
    [`@media (min-width: ${tablet_viewport}px)`]: {
      minWidth: 438,
      maxWidth: 384,
    },
    [`@media (min-width: ${desktop_viewport}px)`]: {
      minWidth: 375,
      maxWidth: 394,
    },
  },
  iconButton: {
    [`@media (min-width: ${tablet_viewport}px)`]: {
      maxWidth: "1.5em",
    },
    [`@media (max-width: ${mobile_viewport}px)`]: {
      maxWidth: "1.7em",
    },
  },
  iconImage: {
    maxWidth: "100%",
  },
  editIconImage: {
    maxWidth: "50%",
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
  searchBar: {
    marginBottom: 10,
  },
}));

const UserEvents = ({ currentUser }) => {
  const classes = styles();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const userId = window.location.pathname.split("/user-events/")[1];
    getUserEvents(userId).then((res) => setEvents(res.events));
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-evenly"
      minHeight={200}
      className={classes.mainContainer}
    >
      <Box display="flex" flexDirection="row" className={classes.container}>
        <Box className={classes.title}>
          <Typography variant="h1">{currentUser.username}'s events </Typography>
        </Box>
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
      <Box display="flex" flexDirection="column" className={classes.container}>
        <SearchBar
          className={classes.searchBar}
          //value={this.state.value}
          //onChange={(newValue) => this.setState({ value: newValue })}
          //onRequestSearch={() => doSomethingWith(this.state.value)}
        />

        {events &&
          events.map((event) => (
            <Box
              className={classes.searchBar}
              display="flex"
              flexDirection="row"
              key={event._id}
            >
              <MediaControlCard event={event} key={event.id} />

              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <IconButton component={Link} to={`/edit-event/${event._id}`}>
                  <img
                    src={editEventIcon}
                    alt="edit-event-icon"
                    className={classes.editIconImage}
                  />
                </IconButton>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, null)(UserEvents);
