import React, { useState } from "react";
import {
  makeStyles,
  Box,
  TextField,
  Button,
  InputLabel,
} from "@material-ui/core";
import tablet_viewport from "../../config";
import PageTitle from "../PageTitle";
import { connect } from "react-redux";
import clsx from "clsx";
import ActionButton from "../ActionButton";
import eventServices from "../../services/events";
import { useHistory } from "react-router-dom";

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
  textField: {
    marginBottom: 20,
    width: "100%",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
  },
  formButton: {
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    filter: "none",
    borderRadius: 10,
  },
  label: {
    textAlign: "left",
    fontWeight: "bold",
    color: theme.palette.onPrimary.main,
    marginBottom: 5,
  },
  socialMediaLabel: {
    marginBottom: 20,
  },
  socialMediaInput: {
    maxWidth: "70%",
    maxHeight: "2em",
    borderRadius: 10,
    filter: "none",
  },
  submitButton: {
    marginBottom: 100,
    marginTop: 20,
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
  },
}));

const NewEvent = ({ currentUser }) => {
  const classes = styles();
  const [eventTitle, setEventTitle] = useState("");
  const [missingEventTitle, setMissingEventTitle] = useState(false);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [missingLocation, setMissingLocation] = useState(false);
  const [date, setDate] = useState("");
  const [missingDate, setMissingDate] = useState(false);
  const [place, setPlace] = useState("");
  const [missingPlace, setMissingPlace] = useState(false);
  const [instruments, setInstruments] = useState([""]);
  const [imageURL, setImageURL] = useState("");
  const history = useHistory();

  const handleEventTitle = (eventTitle) => {
    setEventTitle(eventTitle);
  };

  const handleDescription = (description) => {
    setDescription(description);
  };

  const handleLocation = (location) => {
    setLocation(location);
  };

  const handleDate = (date) => {
    setDate(date)
  }

  const handlePlace = (place) => {
    setPlace(place);
  };

  const handleImage = (image) => {
    setImageURL(image);
  };

  const handleAddField = (e) => {
    if (instruments[instruments.length - 1] !== "") {
      let values = [...instruments];
      values.push("");
      setInstruments(values);
    }
  };

  const handleRemoveField = (i, e) => {
    let values = [...instruments];
    values.splice(i, 1);
    setInstruments(values);
  };

  const handleInstruments = (e, indexToChange) => {
    let inputField = e.target;
    let values = [...instruments].map((instrument, i) => {
      if (i !== indexToChange) return instrument;
      else return inputField.value;
    });
    setInstruments(values);
  };

  const createEvent = () => {
    if (!eventTitle) {
      setMissingEventTitle(true);
    }

    if (!place) {
      setMissingPlace(true);
    }

    if (!location) {
      setMissingLocation(true);
    }

    if (!date) {
      setMissingDate(true);
    }

    if (eventTitle && place && location && date) {
      const formData = new FormData();

      formData.append("title", eventTitle);
      formData.append("place", place);
      formData.append("location", location);
      formData.append("date", date)

      if (imageURL) {
        formData.append("file", imageURL, `eventPic-${eventTitle}`);
      }

      if (description) {
        formData.append("description", description);
      }

      if (instruments) {
        instruments.forEach((instrument) =>
          formData.append("instruments", instrument)
        );
      }

      eventServices.createNewEvent(formData).then((res) => {
        if (res.status === 200) {
          history.push(`/user-events/${currentUser.id}`);
        }
      });
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-evenly"
      minHeight={200}
    >
      <Box display="flex" flexDirection="column">
        <Box className={classes.title}>
          <PageTitle title={"Create Event"} />
        </Box>
        <InputLabel htmlFor="title-edit-input" className={classes.label}>
          Title
        </InputLabel>
        <TextField
          id="title-create-input"
          variant="outlined"
          value={eventTitle}
          onChange={(e) => handleEventTitle(e.target.value)}
          className={clsx(classes.textField, "event-title-input")}
          error={missingEventTitle}
          helperText={missingEventTitle && "This field is required"}
          placeholder={"Late night jam"}
          onClick={() => {
            setMissingEventTitle(false);
          }}
          InputProps={{
            className: classes.input,
            maxLength: 20,
          }}
        />

        <InputLabel
          htmlFor="event-picture-create-upload"
          className={classes.label}
        >
          Event Picture
        </InputLabel>

        <TextField
          variant="outlined"
          type="file"
          name="image"
          maxLength={20}
          //value={imageURL}
          onChange={(e) => handleImage(e.target.files[0])}
          className={clsx(classes.textField, "event-picture-input")}
          InputProps={{
            className: classes.input,
          }}
        />

        <InputLabel htmlFor="description-edit-input" className={classes.label}>
          Description
        </InputLabel>
        <TextField
          variant="outlined"
          placeholder="Bring your instruments."
          multiline
          rows={4}
          value={description}
          onChange={(e) => handleDescription(e.target.value)}
          className={clsx(classes.textField, "description-input")}
          InputProps={{
            className: classes.input,
            maxLength: 380,
          }}
        />

        <InputLabel htmlFor="place-edit-input" className={classes.label}>
          Place
        </InputLabel>
        <TextField
          id="place-create-input"
          variant="outlined"
          value={place}
          onChange={(e) => handlePlace(e.target.value)}
          className={clsx(classes.textField, "place-create-event-input")}
          placeholder={"Da Club"}
          error={missingPlace}
          helperText={missingPlace && "This field is required"}
          onClick={() => setMissingPlace(false)}
          InputProps={{
            className: classes.input,
            maxLength: 20,
          }}
        />

        <InputLabel htmlFor="location-edit-input" className={classes.label}>
          Location
        </InputLabel>
        <TextField
          id="location-create-input"
          variant="outlined"
          value={location}
          onChange={(e) => handleLocation(e.target.value)}
          className={clsx(classes.textField, "location-create-event-input")}
          placeholder={"Berlin"}
          error={missingLocation}
          helperText={missingLocation && "This field is required"}
          onClick={() => {
            setMissingLocation(false);
          }}
          InputProps={{
            className: classes.input,
            maxLength: 20,
          }}
        />

        <InputLabel htmlFor="location-edit-input" className={classes.label}>
          Date
        </InputLabel>

        <TextField
          id="date"
          type="date"
          variant="outlined"
          defaultValue="1992-02-13"
          value={date}
          error={missingDate}
          helperText={missingDate && "This field is required"}
          onChange={(e) => handleDate(e.target.value)}
          onClick={(e) => setMissingDate(false)}
          className={classes.textField}
          InputProps={{
            className: classes.input,
          }}
        />


        <InputLabel
          htmlFor="instruments-create-event-input"
          className={classes.label}
        >
          Instruments available
        </InputLabel>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-evenly"
          width="100%"
        >
          {instruments.map((instrument, i) => (
            <Box
              display="flex"
              flexDirection="row"
              alignItems="strech"
              justifyContent="space-evenly"
              key={i}
              width="100%"
            >
              <TextField
                type="text"
                name="instrument"
                id={"instrument-input-button-" + i}
                variant="outlined"
                value={instrument}
                key={"input" + i}
                className={classes.textField}
                onChange={(e) => handleInstruments(e, i)}
                style={{ marginRight: "10px" }}
                InputProps={{
                  className: classes.input,
                }}
              />
              {i === 0 ? (
                <Button
                  className={classes.formButton}
                  type="button"
                  id="instruments-add-button"
                  variant="outlined"
                  key={"button" + i}
                  onClick={(e) => handleAddField(e)}
                >
                  +
                </Button>
              ) : (
                <Button
                  type="button"
                  id="instrument-delete-button"
                  className={classes.formButton}
                  variant="outlined"
                  key={"button" + i}
                  onClick={(e) => handleRemoveField(i, e)}
                >
                  x
                </Button>
              )}
            </Box>
          ))}
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          width="100%"
          justifyContent="center"
          className={classes.submitButton}
        >
          <ActionButton text="Submit" onClick={createEvent} />
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



export default connect(mapStateToProps, null)(NewEvent);
