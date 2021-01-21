import React from "react";
import { Paper, makeStyles, Typography, IconButton } from "@material-ui/core";
import ProfilePic from "../ProfilePic";
import editProfileIcon from "../../assets/icons/edit_user_profile.png";
import eventsIcon from "../../assets/icons/paper_colored.png";
import facebookIcon from "../../assets/icons/facebook.png";
import instagramIcon from "../../assets/icons/instagram-esbocado.png";
import youtubeIcon from "../../assets/icons/youtube.png";
import spotifyIcon from "../../assets/icons/esboco-spotify.png";

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
    marginTop: "3.5em",
  },
  homePaper: {
    position: "relative",
    minHeight: "80vh",
    background: "linear-gradient(#86BFC2 20%, #B4DBDD 87%, #FFFFFF 110%)",
    width: "27%",
    minWidth: 340,
    maxWidth: 390,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "2em",
  },
  iconsContainer: {
    height: "fit-content",
    width: "30%",
    minWidth: 410,
    maxWidth: 460,
    display: "flex",
    justifyContent: "space-between",
  },
  iconButton: {
    maxWidth: "3.5em",
  },
  iconImage: {
    maxWidth: "100%",
  },
  title: {
    fontWeight: "bold",
    marginTop: "1em",
    marginBottom: "1em",
  },
  instruments: {
    backgroundColor: "white",
    width: "fit-content",
    paddingRight: "1.5em",
    borderRadius: "10px",
    paddingLeft: "1.5em",
    paddingTop: "0.3em",
    paddingBottom: "0.3em",
    marginBottom: "0.8em",
  },
  instrumentsContainer: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-around",
  },
  socialMediaIcon: {
    maxWidth: "1.5em",
  },
  socialMediaContainer: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "center",
  }
}));

const Profile = () => {
  const classes = styles();
  return (
    <div className={classes.mainContainer}>
      <div className={classes.iconsContainer}>
        <IconButton className={classes.iconButton}>
          <img src={eventsIcon} className={classes.iconImage} />
        </IconButton>
        <IconButton className={classes.iconButton}>
          <img src={editProfileIcon} className={classes.iconImage} />
        </IconButton>
      </div>
      <Paper className={classes.homePaper} elevation={6}>
        <ProfilePic />
        <Typography
          className={classes.title}
          style={{ textAlign: "center", marginTop: "43%" }}
        >
          FirstName SurName
        </Typography>
        <Typography>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
        <Typography className={classes.title}>Instruments:</Typography>
        <div className={classes.instrumentsContainer}>
          <div className={classes.instruments}>Singing</div>
          <div className={classes.instruments}>Ukulele Soprano</div>
          <div className={classes.instruments}>Acoustic Guitar</div>
          <div className={classes.instruments}>Saxophone</div>
        </div>
        <Typography className={classes.title}>Follow me on:</Typography>
        <div className={classes.socialMediaContainer}>
          <IconButton>
            <img src={facebookIcon} className={classes.socialMediaIcon} />
          </IconButton>
          <IconButton>
            <img src={instagramIcon} className={classes.socialMediaIcon} />
          </IconButton>
          <IconButton>
            <img src={youtubeIcon} className={classes.socialMediaIcon} />
          </IconButton>
          <IconButton>
            <img src={spotifyIcon} className={classes.socialMediaIcon} />
          </IconButton>
        </div>
      </Paper>
    </div>
  );
};

export default Profile;
