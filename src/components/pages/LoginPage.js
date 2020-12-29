import React from "react";
import { Typography, Link, Box, withStyles } from "@material-ui/core";
import ActionButton from "../ActionButton";
import UsernameField from "../UsernameField";
import {
  desktop_viewport,
  tablet_viewport,
  mobile_viewport,
} from "../../config";
import PasswordField from "../PasswordField";
import PageTitle from "../PageTitle";
import { Link as RouterLink } from "react-router-dom";


const styles = () => ({
  textFieldsContainer: {
    [`@media (min-width: ${mobile_viewport}px)`]: {
      width: "80%",
    },
    [`@media (min-width: ${tablet_viewport}px)`]: {
      width: "50%",
    },
    [`@media (min-width: ${desktop_viewport}px)`]: {
      width: "40%",
    },
  },
});

const LoginPage = ({ classes }) => {
  
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-evenly"
      minHeight={460}
    >
      <PageTitle title={"Welcome back!"} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        className={classes.textFieldsContainer}
      >
        <UsernameField/>
        <PasswordField />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        className={classes.textFieldsContainer}
      >
        <ActionButton text={"Login"}  />
        <Typography variant="caption">
          {"Don't have an account? "}
          <Link component={RouterLink} to="/signup" variant="body2">
            {"Sign up"}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};



export default (withStyles(styles)(LoginPage));
