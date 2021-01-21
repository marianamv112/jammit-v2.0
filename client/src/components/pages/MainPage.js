import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { createStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Switch, Route, NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/registerActions";
import paperLineIcon from "../../assets/icons/paper_line_icon.png";
import paperFillIcon from "../../assets/icons/paper_fill_icon.png";
import jazzLineIcon from "../../assets/icons/jazz_line_icon.png";
import jazzFillIcon from "../../assets/icons/jazz_fill_icon.png";
import userLineIcon from "../../assets/icons/user_line_icon.png";
import userFillIcon from "../../assets/icons/user_fill_icon.png";
import logoutIcon from "../../assets/icons/logout.png";
import jammitLogo from "../../assets/images/jammit-logo-wTitle.png";
import Profile from "./Profile";

const drawerWidth = 240;

const styles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: theme.palette.secondary.main,
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      //justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      display: "flex",
      justifyContent: "center",
    },
    menuIcon: {
      width: "1.5em",
    },
    navlinks: {
      textDecoration: "none",
      color: theme.palette.onPrimary.nav,
    },
    logoIcon: {
      maxWidth: "4.5em",
    },
    appName: {
      fontSize: "2rem",
      color: theme.palette.home.main,
    },
  })
);

const MiniDrawer = (props) => {
  const classes = styles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const { logoutUser } = props;
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" className={classes.appName}>
            {"Jammit"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <NavLink
            to="/main/profile"
            activeClassName="selected"
            className={classes.navlinks}
          >
            <ListItem button key="Profile">
              <ListItemIcon>
                <img src={userLineIcon} className={classes.menuIcon} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </NavLink>
          <NavLink
            to="/home/login"
            activeClassName="selected"
            className={classes.navlinks}
          >
            <ListItem button key="Events">
              <ListItemIcon>
                <img src={paperLineIcon} className={classes.menuIcon} />
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItem>
          </NavLink>
          <NavLink
            to="/home/login"
            activeClassName="selected"
            className={classes.navlinks}
          >
            <ListItem button key="Explore">
              <ListItemIcon>
                <img src={jazzLineIcon} className={classes.menuIcon} />
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItem>
          </NavLink>
          <NavLink
            to="/"
            activeClassName="selected"
            className={classes.navlinks}
          >
            <ListItem button key="Logout" onClick={logoutUser()}>
              <ListItemIcon>
                <img src={logoutIcon} className={classes.menuIcon} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </NavLink>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path={["/", "/main/profile"]} component={Profile} />
          <Route exact path="/home/login" />
          <Route path="/home/signup" />
        </Switch>
      </main>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      logoutUser,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(MiniDrawer);
