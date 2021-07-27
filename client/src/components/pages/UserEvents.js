import React, { useEffect, useState } from "react";
import {
  Box,
  makeStyles,
  Typography,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import configs from "../../config";
import addEventIcon from "../../assets/icons/plus.png";
import editEventIcon from "../../assets/icons/pencil_icon.png";
import MediaControlCard from "../MediaControlCard";
import eventServices from "../../services/events";
import { connect } from "react-redux";
import InfoText from "../InfoText";

const styles = makeStyles((theme) => ({
  mainContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [`@media (min-width: ${configs.tablet_viewport}px && max-width: ${configs.tablet_viewport}px)`]: {
      marginTop: "1em",
    },
    marginTop: 10,
    marginBottom: 70,
  },
  container: {
    height: "fit-content",
    minWidth: 365,
    maxWidth: 435,
    [`@media (max-width: ${configs.tablet_viewport}px)`]: {
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
    width: "100%",
  },
  editIconButton: {
    width: 30,
    padding: 0,
    margin: 10,
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
  extraSpace: {
    marginBottom: 20,
  },
  minimalSpace: {
    marginBottom: 10,
  },
}));

const UserEvents = ({ loggedInUser, otherUser }) => {
  const classes = styles();
  const [events, setEvents] = useState(null);
  const userId = window.location.pathname.split("/user-events/")[1];

  useEffect(() => {
    eventServices.getUserEvents(userId).then((res) => setEvents(res.events));
  }, [userId]);

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
        {events ? <Box display="flex" flexDirection="row" className={classes.container}>

          <Box className={classes.title}>
            <Typography variant="h1">
              {userId === loggedInUser.id ? loggedInUser.username : events[0].author.username}'s events
            </Typography>
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
        </Box> : <CircularProgress />}
        {events ?
          events.length > 0 ?
            events.map((event) => (
              <Box
                className={classes.minimalSpace}
                display="flex"
                flexDirection="row"
                key={event._id}
              >
                <MediaControlCard event={event} key={event.id} />

                {
                  loggedInUser.id === userId &&
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <IconButton
                      component={Link}
                      to={`/edit-event/${event._id}`}
                      className={classes.editIconButton}
                    >
                      <img
                        src={editEventIcon}
                        alt="edit-event-icon"
                        className={classes.iconImage}
                      />
                    </IconButton>
                  </Box>}
              </Box>
            ))
            : <InfoText content={"This user has no events"} />
          :
          <CircularProgress />
        }
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, null)(UserEvents);
