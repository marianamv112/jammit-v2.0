import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Box, makeStyles, IconButton, Typography, CircularProgress, ButtonBase } from "@material-ui/core";
import eventServices from "../../services/events";
import { Link } from "react-router-dom";
import editEventIcon from "../../assets/icons/pencil_icon.png";
import configs from "../../config";
import EventIcon from "@material-ui/icons/Event";
import PlaceIcon from "@material-ui/icons/Place";
import clsx from "clsx";
import ReactRoundedImage from "react-rounded-image";
import Moment from 'react-moment';


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
    [`@media (min-width: ${configs.tablet_viewport}px)`]: {
      marginTop: "1em",
    },
  },
  container: {
    height: "fit-content",
    [`@media (min-width: ${configs.tablet_viewport}px) and (max-width: ${configs.desktop_viewport}px)`]: {
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

const ViewEvent = ({ loggedInUser }) => {
  const [event, setEvent] = useState("");
  const classes = styles();
  const eventId = window.location.pathname.split("/view-event/")[1];

  useEffect(() => {
    eventServices.getSingleEvent(eventId).then((res) => {
      setEvent(res.event)
    });
  }, [eventId]);

  return (
    event ?
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
          {loggedInUser.id === event.author._id &&
            <IconButton
              component={Link}
              to={`/edit-event/${event._id}`}
              className={classes.iconButton}
            >
              <img
                src={editEventIcon}
                alt="edit-event-icon"
                className={classes.iconImage}
              />
            </IconButton>}
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
              <Typography className={classes.text}><Moment format="dddd, Do MMMM YYYY">{event.date}</Moment></Typography>
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
          display="flex"
          flexDirection="row"
          className={clsx(classes.container, classes.title)}
        >
          <ButtonBase component={Link} to={`/profile/${event.author._id}`}>
            <ReactRoundedImage
              image={event.author.profilePicture}
              roundedSize="0"
              imageWidth="60"
              imageHeight="60"
            />
          </ButtonBase>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            className={classes.text}
          >
            <Typography>
              <b>Posted by:</b>
            </Typography>
            <Typography>{event.author.username}</Typography>
          </Box>
        </Box>
      </Box>
      :
      <CircularProgress />
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, null)(ViewEvent);
