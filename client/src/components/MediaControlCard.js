import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { ButtonBase } from "@material-ui/core"
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
  },
  root: {
    display: "flex",
    border: "1px solid black",
    minHeight: 126,
    width: "100%",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
    margin: 10,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const MediaControlCard = (props) => {
  const classes = useStyles();
  const event = props.event;

  return (
    <ButtonBase component={Link} to={`/view-event/${event._id}`} className={classes.button}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          image={event.eventPicture}
          title={event.title ? event.title : event.name}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="subtitle1">{event.title ? event.title : event.name}</Typography>
            <Typography variant="subtitle1">{event.location ? event.location : event.formatted_address}</Typography>
            <Typography variant="subtitle1">{event.place}</Typography>
          </CardContent>
        </div>
      </Card>
    </ButtonBase>
  );
};

export default MediaControlCard;
