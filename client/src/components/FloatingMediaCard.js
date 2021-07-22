import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    border: "1px solid black",
    minHeight: 126,
    width: "100%",
    textAlign: "left",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0
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

const FloatingMediaCard = (props) => {
  const classes = useStyles();
  const event = props.event;
  const close = props.switch;

  return (
    <Card className={classes.root}>
      <IconButton aria-label="close" classeName={classes.closeButton} onClick={close}> 
        <CloseIcon />
      </IconButton>

      <CardMedia
        className={classes.cover}
        image={event.eventPicture}
        title={event.title ? event.title : event.name}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle1">
            {event.title ? event.title : event.name}
          </Typography>
          <Typography variant="subtitle1">
            {event.location ? event.location : event.formatted_address}
          </Typography>
          <Typography variant="subtitle1">{event.place}</Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default FloatingMediaCard;
