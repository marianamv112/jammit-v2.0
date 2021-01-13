import React, { useState } from "react";
import {
  Typography,
  Link,
  Box,
  withStyles,
  CircularProgress,
} from "@material-ui/core";
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
import { loginUser, cleanError } from "../../redux/actions/registerActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfoText from "../InfoText";

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

const LoginPage = ({
  classes,
  loading,
  error,
  loginUser,
  cleanError,
  errorMessage,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [missingUsername, setMissingUsername] = useState(false);
  const [missingPassword, setMissingPassword] = useState(false);

  const handleUsername = (username) => {
    setUsername(username);
  };

  const handlePassword = (password) => {
    setPassword(password);
  };

  const setUser = (username, password) => {
    if (!username) {
      setMissingUsername(true);
    }

    if (!password) {
      setPassword(true);
    }

    if (username && password) {
      loginUser(username, password);
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
      <PageTitle title={"Welcome Back"} />
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
        <PasswordField
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
          error={missingPassword}
          onClick={() => {
            setMissingPassword(false);
            cleanError();
          }}
        />
        {error && <InfoText error content={errorMessage} />}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        className={classes.textFieldsContainer}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <ActionButton
              disabled={error}
              text={"Login"}
              onClick={() => setUser(username, password)}
            />
            <Typography variant="caption">
              {"Don't have an account? "}
              <Link 
              id="login-signup-link"
              component={RouterLink} 
              to="/signup" 
              variant="body2">
                {"Sign up"}
              </Link>
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    error: state.user.error,
    errorMessage: state.user.errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      loginUser,
      cleanError,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LoginPage));
