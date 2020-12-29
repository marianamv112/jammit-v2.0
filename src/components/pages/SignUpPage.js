import React, { useState } from "react";
import { Typography, Link, Box, withStyles } from "@material-ui/core";
import ActionButton from "../ActionButton";
import {
  desktop_viewport,
  tablet_viewport,
  mobile_viewport,
  email_format,
} from "../../config";
import PasswordField from "../PasswordField";
import UsernameField from "../UsernameField";
import EmailField from "../EmailField";
import PageTitle from "../PageTitle";
import { Link as RouterLink } from "react-router-dom";

import { connect } from "react-redux";
import registerUser from "../../redux/actions/registerActions";
import { bindActionCreators } from "redux";

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

const SignUpPage = ({ classes, registerUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [missingUsername, setMissingUsername] = useState(false);
  const [missingEmail, setMissingEmail] = useState(false);
  const [wrongEmailFormat, setWrongEmailFormat] = useState(false);
  const [missingPassword, setMissingPassword] = useState(false);

  const handleUsername = (username) => {
    setUsername(username);
  };

  const handleEmail = (email) => {
    setEmail(email);
  };

  const handlePassword = (password) => {
    setPassword(password);
  };

  const setUser = (username, email, password) => {
    if (!username) {
      setMissingUsername(true);
    }

    if (!email) {
      setMissingEmail(true);
    }
    if (email && !email.match(email_format)) {
      setWrongEmailFormat(true);
    } 

    if (!password) {
      setMissingPassword(true);
    }

    if (username && email && password && email.match(email_format)) {
      registerUser(username, email, password);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-evenly"
      minHeight={460}
    >
      <PageTitle title={"Sign up to Jammit"} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        className={classes.textFieldsContainer}
      >
        <UsernameField
          value={username}
          onChange={(e) => handleUsername(e.target.value)}
          error={missingUsername}
          onClick={() => setMissingUsername(false)}
        />
        <EmailField
          value={email}
          onChange={(e) => handleEmail(e.target.value)}
          errorValues={
            wrongEmailFormat
              ? "wrongEmailFormat"
              : missingEmail && "missingEmail"
          }
          onClick={() => {
            setWrongEmailFormat(false);
            setMissingEmail(false);
          }}
        />
        <PasswordField
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
          error={missingPassword}
          onClick={() => setMissingPassword(false)}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        className={classes.textFieldsContainer}
      >
        <ActionButton
          text={"Sign Up"}
          action={(e) => 
            {e.preventDefault()
             setUser(username, email, password)}}
        />
        <Typography variant="caption">
          {"Already have an account? "}
          <Link component={RouterLink} to="/login">
            <b>{"Login"}</b>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.currentUser.username,
    email: state.currentUser.email,
    password: state.currentUser.password,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      registerUser,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignUpPage));
