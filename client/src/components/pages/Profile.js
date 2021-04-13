import React from "react";
import { Paper, makeStyles, Typography, IconButton } from "@material-ui/core";
import ProfilePic from "../ProfilePic";
import editProfileIcon from "../../assets/icons/edit_user_profile.png";
import eventsIcon from "../../assets/icons/paper_colored.png";
import facebookIcon from "../../assets/icons/facebook.png";
import instagramIcon from "../../assets/icons/instagram-esbocado.png";
import youtubeIcon from "../../assets/icons/youtube.png";
import spotifyIcon from "../../assets/icons/esboco-spotify.png";
import {
  mobile_viewport,
  tablet_viewport,
  desktop_viewport,
} from "../../config";
import clsx from "clsx";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
    [`@media (min-width: ${tablet_viewport}px && max-width: ${tablet_viewport}px)`]: {
      marginTop: "1em",
    },
  },
  homePaper: {
    position: "relative",
    background: "linear-gradient(#86BFC2 20%, #B4DBDD 87%, #FFFFFF 110%)",
    overflowWrap: "break-word",
    //width: "27%",
    display: "flex",
    //justifyContent: "center",
    flexDirection: "column",
    padding: "2em",
    borderRadius: 15,
    [`@media (max-width: ${mobile_viewport}px)`]: {
      minWidth: 270,
      maxWidth: 384,
      minHeight: "65vh",
    },
    [`@media (min-width: ${tablet_viewport}px)`]: {
      minWidth: 340,
      maxWidth: 390,
      minHeight: "73vh",
    },
    [`@media (min-width: ${desktop_viewport}px)`]: {
      minWidth: 245,
      maxWidth: 245,
      minHeight: "62vh",
    },
  },
  iconsContainer: {
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
      maxWidth: "2.5em",
    },
    [`@media (max-width: ${mobile_viewport}px)`]: {
      maxWidth: "2.7em",
    },
  },
  iconImage: {
    maxWidth: "100%",
  },
  title: {
    fontWeight: "bold",
    marginTop: "1em",
    marginBottom: "1em",
  },
  followMe: {
    fontWeight: "bold",
    [`@media (min-width: ${tablet_viewport}px)`]: {
      marginTop: "1em",
      marginBottom: "1em",
    },
  },
  instrumentsText: {
    fontSize: "0.8rem",
    fontWeight: "bold",
  },

  instruments: {
    backgroundColor: "white",
    width: "fit-content",
    borderRadius: "10px",
    paddingTop: "0.3em",
    paddingBottom: "0.3em",
    marginBottom: "0.8em",
    marginRight: "1em",
    [`@media (min-width: ${tablet_viewport}px)`]: {
      paddingRight: "1.5em",
      paddingLeft: "1.5em",
    },
    [`@media (max-width: ${mobile_viewport}px)`]: {
      paddingRight: "1em",
      paddingLeft: "1em",
    },
  },
  instrumentsContainer: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
  },
  socialMediaIcon: {
    maxWidth: "1.5em",
  },
  socialMediaContainer: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "center",
  },
  username: {
    textAlign: "center",
    [`@media (min-width: ${desktop_viewport}px)`]: {
      marginTop: "30%",
    },
    [`@media (max-width: ${tablet_viewport}px)`]: {
      marginTop: "0%",
    },
    [`@media (max-width: ${mobile_viewport}px)`]: {
      marginTop: "35%",
    },
  },
}));

const Profile = ({ currentUser }) => {
  const classes = styles();
 
  return (
    <div className={classes.mainContainer}>
      <div className={classes.iconsContainer}>
        <IconButton
          component={Link}
          to={`/user-events/${currentUser.id}`}
          className={classes.iconButton}
        >
          <img
            src={eventsIcon}
            alt="events-icon"
            className={classes.iconImage}
          />
        </IconButton>
        <IconButton
          component={Link}
          to="/edit-profile"
          className={classes.iconButton}
        >
          <img
            src={editProfileIcon}
            alt="edit-profile-icon"
            className={classes.iconImage}
          />
        </IconButton>
      </div>
      <Paper className={classes.homePaper} elevation={6}>
        <ProfilePic image={currentUser.profilePicture} />
        <Typography className={clsx(classes.title, classes.username)}>
          {currentUser && currentUser.username}
        </Typography>
        <Typography>{currentUser && currentUser.bio}</Typography>
        <Typography className={classes.title}>
          {currentUser.instruments &&
            currentUser.instruments[0] !== "" &&
            "Instruments:"}
        </Typography>
        <div className={classes.instrumentsContainer}>
          {currentUser.instruments &&
            currentUser.instruments.length > 0 &&
            currentUser.instruments.map((instrument) => {
              return (
                instrument !== "" && (
                  <div className={classes.instruments}>
                    <Typography
                      style={{ fontSize: "0.8rem", fontWeight: "bold" }}
                    >
                      {instrument}
                    </Typography>
                  </div>
                )
              );
            })}
        </div>
        <Typography className={classes.followMe}>
          {currentUser.socialMedia && "Follow me on:"}
        </Typography>
        <div className={classes.socialMediaContainer}>
          {currentUser.socialMedia && currentUser.socialMedia.facebook && (
            <IconButton
              href={`https://www.facebook.com/people/${currentUser.socialMedia.instagram}`}
            >
              <img
                src={facebookIcon}
                alt="facebook-icon"
                className={classes.socialMediaIcon}
              />
            </IconButton>
          )}
          {currentUser.socialMedia && currentUser.socialMedia.instagram && (
            <IconButton
              href={`https://www.instagram.com/${currentUser.socialMedia.instagram}`}
            >
              <img
                src={instagramIcon}
                alt="instagram-icon"
                className={classes.socialMediaIcon}
              />
            </IconButton>
          )}
          {currentUser.socialMedia && currentUser.socialMedia.youtube && (
            <IconButton
              href={`https://www.youtube.com/${currentUser.socialMedia.instagram}`}
            >
              <img
                src={youtubeIcon}
                alt="youtube-icon"
                className={classes.socialMediaIcon}
              />
            </IconButton>
          )}
          {currentUser.socialMedia && currentUser.socialMedia.spotify && (
            <IconButton
              href={`https://open.spotify.com/user/${currentUser.socialMedia.spotify}`}
            >
              <img
                src={spotifyIcon}
                alt="spotify-icon"
                className={classes.socialMediaIcon}
              />
            </IconButton>
          )}
        </div>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, null)(Profile);
