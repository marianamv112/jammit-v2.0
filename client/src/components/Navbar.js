import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import paperLineIcon from "../assets/icons/paper_line_icon.png";
import paperFillIcon from "../assets/icons/paper_fill_icon.png";
import jazzLineIcon from "../assets/icons/jazz_line_icon.png";
import jazzFillIcon from "../assets/icons/jazz_fill_icon.png";
import userLineIcon from "../assets/icons/user_line_icon.png";
import userFillIcon from "../assets/icons/user_fill_icon.png";
import logoutIcon from "../assets/icons/logout.png";
import registerActions from "../redux/actions/registerActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

const styles = makeStyles((theme) => ({
  appBar: {
    position: "fixed",
    top: "auto",
    bottom: 0,
    backgroundColor: theme.palette.secondary.main,
    width: "100%",
    transition: "none !important"
  },
  menuIcon: {
    width: "1.5em",
  },
  navlinks: {
    textDecoration: "none",
    color: theme.palette.onPrimary.nav,
  },
  root: {
    transition: "none"
  }
}));

const Navbar = ({ logoutUser, currentUser }) => {
  const classes = styles();
  const [value, setValue] = React.useState(0);


  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.appBar}
    >
      <BottomNavigationAction
        component={Link}
        to={`/profile/${currentUser.id}`}
        classes={{ selected: classes.navlinks, root: classes.root }}
        label="Profile"
        icon={
          value === 0 ? (
            <img
              src={userFillIcon}
              alt="user-icon-filled"
              className={classes.menuIcon}
            />
          ) : (
            <img
              src={userLineIcon}
              alt="user-icon-line"
              className={classes.menuIcon}
            />
          )
        }
      />

      <BottomNavigationAction
        component={Link}
        to="/all-events"
        classes={{ selected: classes.navlinks, root: classes.root }}
        label="Events"
        icon={
          value === 1 ? (
            <img
              src={paperFillIcon}
              alt="paper-icon-filled"
              className={classes.menuIcon}
            />
          ) : (
            <img
              src={paperLineIcon}
              alt="paper-icon-filled"
              className={classes.menuIcon}
            />
          )
        }
      />
      <BottomNavigationAction
        component={Link}
        to="/view-map"
        classes={{ selected: classes.navlinks, root: classes.root }}
        label="Explore"
        icon={
          value === 2 ? (
            <img
              src={jazzFillIcon}
              alt="jazz-icon-filled"
              className={classes.menuIcon}
            />
          ) : (
            <img
              src={jazzLineIcon}
              alt="jazz-icon-filled"
              className={classes.menuIcon}
            />
          )
        }
      />
      <BottomNavigationAction
        classes={{ selected: classes.navlinks }}
        label="Logout"
        icon={
          <img
            alt="logout-icon"
            src={logoutIcon}
            className={classes.menuIcon}
          />
        }
        onClick={() => logoutUser()}
      />
    </BottomNavigation>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      logoutUser: registerActions.logoutUser,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
