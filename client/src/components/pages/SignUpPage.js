import React, { useState } from "react";
import { Typography, Link, Box, makeStyles } from "@material-ui/core";
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
import InfoText from "../InfoText";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { cleanError, registerUser } from "../../redux/actions/registerActions";

const styles = makeStyles((theme) => ({
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
  textBox: {
    backgroundColor: theme.palette.primary.info,
    width: "100%",
    textAlign: "center",
    marginBottom: "1em",
    paddingTop: "0.4em",
    paddingBottom: "0.4em",
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
}));

const SignUpPage = ({
  error,
  errorMessage,
  registerUser,
  cleanError,
  pendingUser,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [missingUsername, setMissingUsername] = useState(false);
  const [missingEmail, setMissingEmail] = useState(false);
  const [wrongEmailFormat, setWrongEmailFormat] = useState(false);
  const [missingPassword, setMissingPassword] = useState(false);

  const classes = styles();

  const handleUsername = (username) => {
    setUsername(username);
  };

  const handleEmail = (email) => {
    setEmail(email);
  };

  const handlePassword = (password) => {
    setPassword(password);
  };

  const signupUser = (username, email, password) => {
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
          onClick={() => {
            setMissingUsername(false);
            cleanError();
          }}
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
            cleanError();
          }}
        />
        <PasswordField
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
          error={missingPassword}
          onClick={() => {
            setMissingPassword(false);
            cleanError();
          }}
        />
        {error && (
          <InfoText error content={errorMessage} />
        )}
        {pendingUser && (
          <InfoText content={errorMessage} />
        )}
      </Box>
      {!pendingUser && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          className={classes.textFieldsContainer}
        >
          <ActionButton
            id="signup-submit-button"
            disabled={
              missingEmail ||
              missingUsername ||
              missingUsername ||
              wrongEmailFormat ||
              error
            }
            text={"Sign Up"}
            onClick={(e) => {
              signupUser(username, email, password);
            }}
          />
          <Typography variant="caption">
            {"Already have an account? "}
            <Link id="signup-login-link" component={RouterLink} to="/login">
              <b>{"Login"}</b>
            </Link>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.user.error,
    errorMessage: state.user.errorMessage,
    pendingUser: state.user.pendingUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      registerUser,
      cleanError,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);