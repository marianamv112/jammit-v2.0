import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Box, makeStyles, IconButton, Typography } from "@material-ui/core";
import { getSingleEvent } from "../../services/events";
import { Link } from "react-router-dom";
import editEventIcon from "../../assets/icons/pencil_icon.png";
import {
  mobile_viewport,
  tablet_viewport,
  desktop_viewport,
} from "../../config";
import EventIcon from "@material-ui/icons/Event";
import PlaceIcon from "@material-ui/icons/Place";
import clsx from "clsx";

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
  eventContent: {
    border: "1px solid black",
    borderRadius: 15,
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
  },
  iconButton: {
    maxWidth: "1em",
  },
  iconImage: {
    maxWidth: "100%",
  },
  eventPicture: {
    maxWidth: "80%",
    margin: 30,
  },
  roundFrame: {
    overflow: "hidden",
    width: 60,
    borderRadius: "50%",
    height: 60,
  },
  profileImage: {
    width: "auto",
    height: "100%",
  },
  eventContents: {
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 20,
  },
  text: {
    marginLeft: 10
  }
}));

const ViewEvent = ({ currentUser }) => {
  const [event, setEvent] = useState("");
  const classes = styles();
  const eventId = window.location.pathname.split("/view-event/")[1];

  useEffect(() => {
    getSingleEvent(eventId).then((res) => setEvent(res.event));
  });

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
        <Box className={classes.title}>
          <Typography variant="h1">{event.title} </Typography>
        </Box>
        <IconButton
          component={Link}
          to={`/edit-event/${event.id}`}
          className={classes.iconButton}
        >
          <img
            src={editEventIcon}
            alt="edit-event-icon"
            className={classes.iconImage}
          />
        </IconButton>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        className={clsx(classes.container, classes.eventContent)}
      >
        <Box display="flex" flexDirection="column" justifyContent="center">
          <img
            src={event.eventPicture}
            alt="edit-event-icon"
            className={classes.eventPicture}
          />
          <Box
            display="flex"
            flexDirection="row"
            className={classes.eventContents}
          >
            <EventIcon />
            <Typography className={classes.text}>Friday, 27th July</Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            className={classes.eventContents}
          >
            <PlaceIcon />
            <Typography className={classes.text}>
              {event.place}, {event.location}
            </Typography>
          </Box>
          <Typography className={classes.eventContents}>
            {event.description}
          </Typography>
        </Box>
      </Box>
      <Box
        className={classes.searchBar}
        display="flex"
        flexDirection="row"
        className={clsx(classes.container, classes.title)}
      >
        <Box display="flex" className={classes.roundFrame}>
          <img
            src={currentUser.profilePicture}
            alt="profile-picture"
            className={classes.profileImage}
          />
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          className={classes.text}
        >
          <Typography>
            <b>Posted by:</b>
          </Typography>
          <Typography>{currentUser.username}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, null)(ViewEvent);
