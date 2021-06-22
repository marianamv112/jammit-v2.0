import React, { useState } from "react";
import {
  Typography,
  Link,
  Box,
  withStyles,
  CircularProgress,
} from "@material-ui/core";
import ActionButton from "../ActionButton";
import EmailField from "../EmailField";
import {
  tablet_viewport,
} from "../../config";
import PasswordField from "../PasswordField";
import PageTitle from "../PageTitle";
import { Link as RouterLink } from "react-router-dom";
import { loginUser, cleanError } from "../../redux/actions/registerActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfoText from "../InfoText";
import clsx from "clsx"

const styles = () => ({
  mainContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [`@media (min-width: ${tablet_viewport}px && max-width: ${tablet_viewport}px)`]: {
      marginTop: "1em",
    },
    marginTop: 10,
    marginBottom: 70,
  },
  container: {
    height: "fit-content",
    display: "flex",
    justifyContent: "space-between",
    minWidth: 365,
    [`@media (max-width: ${tablet_viewport}px)`]: {
      minWidth: 300
    },
  },
  bottomContainer: {
    marginTop: 20,
    marginBottom: 20
  }
});

const LoginPage = ({
  classes,
  loading,
  error,
  loginUser,
  cleanError,
  errorMessage,
}) => {
  const [password, setPassword] = useState("");
  const [missingPassword, setMissingPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [missingEmail, setMissingEmail] = useState(false);

  const handleEmail = (email) => {
    setEmail(email);
  };

  const handlePassword = (password) => {
    setPassword(password);
  };

  const setUser = (email, password) => {
    if (!email) {
      setMissingEmail(true);
    }

    if (!password) {
      setPassword(true);
    }

    if (email && password) {
      loginUser(email, password);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-evenly"
      minHeight={460}
      className={classes.mainContainer}
    >
      <Box className={classes.container}>
        <PageTitle title={"Welcome Back"} />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        className={classes.container}
      >
        <EmailField
          value={email}
          onChange={(e) => handleEmail(e.target.value)}
          errorValues={missingEmail && "missingEmail"}
          onClick={() => {
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
        {error && <InfoText error content={errorMessage} />}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        className={clsx(classes.container, classes.bottomContainer)}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <ActionButton
              disabled={error}
              text={"Login"}
              onClick={() => setUser(email, password)}
            />
            <Typography variant="caption">
              {"Don't have an account? "}
              <Link
                id="login-signup-link"
                component={RouterLink}
                to="/signup"
                variant="body2"
              >
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
