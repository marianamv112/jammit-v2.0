import React, { useState } from "react";
import {
  makeStyles,
  Box,
  TextField,
  Button,
  InputLabel,
  Typography,
} from "@material-ui/core";
import tablet_viewport from "../../config";
import PageTitle from "../PageTitle";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import clsx from "clsx";
import ActionButton from "../ActionButton";
import { updateUser } from "../../redux/actions/userActions";

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

const EditProfile = ({ currentUser, updateUser, ...props }) => {
  const classes = styles();
  const [username, setUsername] = useState(currentUser.username);
  const [missingUsername, setMissingUsername] = useState(false);
  const [bio, setBio] = useState(currentUser.bio);
  const [instruments, setInstruments] = useState(currentUser.instruments);
  const [imageURL, setImageURL] = useState(currentUser.imageURL);
  const [socialMedia, setSocialMedia] = useState(currentUser.socialMedia);

  const handleUsername = (username) => {
    setUsername(username);
  };

  const handleBio = (biography) => {
    setBio(biography);
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

  const handleSocialMedia = (socialMediaType, username) => {
    if (username) {
      setSocialMedia({ ...socialMedia, [`${socialMediaType}`]: username });
    }
  };

  const submitUpdate = () => {
    const formData = new FormData();
    if (imageURL) {
      formData.append("file", imageURL, "profilePic");
    }
    if (username) {
      formData.append("username", username);
    }
    if (bio) {
      formData.append("bio", bio);
    }
    if (instruments) {
      instruments.forEach(instrument =>
        formData.append("instruments", instrument))
    }
    if (socialMedia) {
      Object.keys(socialMedia).forEach(key => formData.append(key, socialMedia[key]));
    }

    updateUser(currentUser.id, formData);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-evenly"
      minHeight={200}
    >
      <Box
        display="flex"
        flexDirection="column"
      >
        <Box className={classes.title}>
          <PageTitle title={"Edit Profile"} />
        </Box>
        <InputLabel htmlFor="username-edit-input" className={classes.label}>
          Username
        </InputLabel>
        <TextField
          id="username-edit-input"
          variant="outlined"
          value={username}
          onChange={(e) => handleUsername(e.target.value)}
          className={clsx(classes.textField, "username-input")}
          error={missingUsername}
          onClick={() => {
            setMissingUsername(false);
          }}
          InputProps={{
            className: classes.input,
            maxLength: 20,
          }}
        />

        <InputLabel
          htmlFor="profile-picture-edit-upload"
          className={classes.label}
        >
          Profile Picture
        </InputLabel>

        <TextField
          variant="outlined"
          type="file"
          name="image"
          maxLength={20}
          //value={imageURL}
          onChange={(e) => handleImage(e.target.files[0])}
          className={clsx(classes.textField, "profile-picture-input")}
          InputProps={{
            className: classes.input,
          }}
        />

        <InputLabel htmlFor="bio-edit-input" className={classes.label}>
          Bio
        </InputLabel>
        <TextField
          variant="outlined"
          placeholder="I like to sing and vintage style..."
          multiline
          rows={4}
          value={bio}
          onChange={(e) => handleBio(e.target.value)}
          className={clsx(classes.textField, "bio-input")}
          InputProps={{
            className: classes.input,
            maxLength: 380,
          }}
        />
        <InputLabel htmlFor="instruments-edit-input" className={classes.label}>
          Instruments
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
        <InputLabel htmlFor="instruments-edit-input" className={classes.label}>
          Social Media
        </InputLabel>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-evenly"
          width="100%"
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            width="100%"
            justifyContent="space-between"
          >
            <Typography className={classes.socialMediaLabel}>
              Spotify:
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Enter username"
              maxLength={20}
              value={currentUser.socialMedia && socialMedia.spotify}
              onChange={(e) => handleSocialMedia("spotify", e.target.value)}
              className={clsx(
                classes.textField,
                classes.socialMediaInput,
                "spotify-username-input"
              )}
              InputProps={{
                className: classes.socialMediaInput,
              }}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            width="100%"
            justifyContent="space-between"
          >
            <Typography className={classes.socialMediaLabel}>
              Instagram:
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Enter username"
              maxLength={20}
              value={currentUser.socialMedia && socialMedia.instagram}
              onChange={(e) => handleSocialMedia("instagram", e.target.value)}
              className={clsx(
                classes.textField,
                classes.socialMediaInput,
                "instagram-username-input"
              )}
              InputProps={{
                className: classes.socialMediaInput,
              }}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            width="100%"
            justifyContent="space-between"
          >
            <Typography className={classes.socialMediaLabel}>
              Facebook:
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Enter username"
              maxLength={20}
              value={currentUser.socialMedia && socialMedia.facebook}
              onChange={(e) => handleSocialMedia("facebook", e.target.value)}
              className={clsx(
                classes.textField,
                classes.socialMediaInput,
                "facebook-username-input"
              )}
              InputProps={{
                className: classes.socialMediaInput,
              }}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            width="100%"
            justifyContent="space-between"
          >
            <Typography className={classes.socialMediaLabel}>
              Youtube:
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Enter username"
              maxLength={20}
              value={currentUser.socialMedia && socialMedia.youtube}
              onChange={(e) => handleSocialMedia("youtube", e.target.value)}
              className={clsx(
                classes.textField,
                classes.socialMediaInput,
                "youtube-username-input"
              )}
              InputProps={{
                className: classes.socialMediaInput,
              }}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          width="100%"
          justifyContent="center"
          className={classes.submitButton}>
          <ActionButton text="Submit" onClick={submitUpdate} />
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateUser,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
