import React, { useEffect, useState } from "react";
import { Paper, makeStyles, Typography, IconButton, CircularProgress } from "@material-ui/core";
import ProfilePic from "../ProfilePic";
import editProfileIcon from "../../assets/icons/edit_user_profile.png";
import eventsIcon from "../../assets/icons/paper_colored.png";
import facebookIcon from "../../assets/icons/facebook.png";
import instagramIcon from "../../assets/icons/instagram-esbocado.png";
import youtubeIcon from "../../assets/icons/youtube.png";
import spotifyIcon from "../../assets/icons/esboco-spotify.png";
import configs from "../../config";
import clsx from "clsx";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import userServices from "../../services/users";

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
  homePaper: {
    position: "relative",
    background: "linear-gradient(#86BFC2 20%, #B4DBDD 87%, #FFFFFF 110%)",
    overflowWrap: "break-word",
    display: "flex",
    flexDirection: "column",
    padding: "2em",
    borderRadius: 15,
    minWidth: 300,
    [`@media (max-width: ${configs.tablet_viewport}px)`]: {
      minWidth: 235
    },
    minHeight: "62vh"
  },
  iconsContainer: {
    height: "fit-content",
    display: "flex",
    justifyContent: "space-between",
    minWidth: 365,
    [`@media (max-width: ${configs.tablet_viewport}px)`]: {
      minWidth: 300
    },
    marginTop: 10,
  },
  iconButton: {
    width: 60,
    padding: 0,
    margin: 10,
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
  },
  iconImage: {
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    marginTop: "1em",
    marginBottom: "1em",
  },
  followMe: {
    fontWeight: "bold",
    [`@media (min-width: ${configs.tablet_viewport}px)`]: {
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
    [`@media (min-width: ${configs.tablet_viewport}px)`]: {
      paddingRight: "1.5em",
      paddingLeft: "1.5em",
    },
    [`@media (max-width: ${configs.mobile_viewport}px)`]: {
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
    marginTop: 100,
    [`@media (max-width: ${configs.tablet_viewport}px)`]: {
      marginTop: 70
    },
  },
}));

const Profile = ({ loggedInUser }) => {
  const classes = styles();
  const currentProfileId = window.location.pathname.split("/profile/")[1];
  const [user, setUserProfile] = useState(null)

  useEffect(() => {
    userServices.getUser(currentProfileId).then(user => setUserProfile(user))
  }, [currentProfileId])

  return (

    <div className={classes.mainContainer}>
      {user ?
        <>
          <div className={classes.iconsContainer}>
            <IconButton
              component={Link}
              to={`/user-events/${currentProfileId}`}
              className={classes.iconButton}
            >
              <img
                src={eventsIcon}
                alt="events-icon"
                className={classes.iconImage}
              />
            </IconButton>
            {
              currentProfileId === loggedInUser.id &&
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
            }
          </div>
          <Paper className={classes.homePaper} elevation={6}>
            <ProfilePic image={user.profilePicture} />
            <Typography className={clsx(classes.title, classes.username)}>
              {user && user.username}
            </Typography>
            <Typography variant="body1">{user && user.bio}</Typography>
            <Typography className={classes.title}>
              {user.instruments &&
                user.instruments[0] !== "" &&
                "Instruments:"}
            </Typography>
            <div className={classes.instrumentsContainer}>
              {user.instruments &&
                user.instruments.length > 0 &&
                user.instruments.map((instrument, index) => {
                  return (
                    instrument !== "" && (
                      <div className={classes.instruments} key={index}>
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
              {(user.socialMedia.facebook ||
                user.socialMedia.instagram ||
                user.socialMedia.spotify ||
                user.socialMedia.youtube) &&
                "Follow me on:"}
            </Typography>
            <div className={classes.socialMediaContainer}>
              {user.socialMedia && user.socialMedia.facebook && (
                <IconButton
                  href={`https://www.facebook.com/people/${user.socialMedia.facebook}`}
                >
                  <img
                    src={facebookIcon}
                    alt="facebook-icon"
                    className={classes.socialMediaIcon}
                  />
                </IconButton>
              )}
              {user.socialMedia && user.socialMedia.instagram && (
                <IconButton
                  href={`https://www.instagram.com/${user.socialMedia.instagram}`}
                >
                  <img
                    src={instagramIcon}
                    alt="instagram-icon"
                    className={classes.socialMediaIcon}
                  />
                </IconButton>
              )}
              {user.socialMedia && user.socialMedia.youtube && (
                <IconButton
                  href={`https://www.youtube.com/${user.socialMedia.youtube}`}
                >
                  <img
                    src={youtubeIcon}
                    alt="youtube-icon"
                    className={classes.socialMediaIcon}
                  />
                </IconButton>
              )}
              {user.socialMedia && user.socialMedia.spotify && (
                <IconButton
                  href={`https://open.spotify.com/user/${user.socialMedia.spotify}`}
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
        </>
        :
        <CircularProgress />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, null)(Profile);
