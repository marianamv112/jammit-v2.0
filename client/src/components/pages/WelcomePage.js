import React, { useEffect } from "react";
import {
  Box,
  withStyles,
  Link,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import PageTitle from "../PageTitle";
import InfoText from "../InfoText";
import registerActions from "../../redux/actions/registerActions";
import { bindActionCreators } from "redux";
import configs from "../../config";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

const styles = () => ({
  mainContainer: {
    width: "100%",
    [`@media (min-width: ${configs.mobile_viewport}px && max-width: ${configs.mobile_viewport}px)`]: {
      marginTop: "1em",
    },
    marginTop: 10,
    marginBottom: 70,
  },
  container: {
    height: "fit-content",
    display: "flex",
    justifyContent: "space-between",
    width: 365,
    [`@media (max-width: ${configs.mobile_viewport}px)`]: {
      width: 300,
    },
  },
});

const WelcomePage = ({
  classes,
  validateUser,
  loading,
  error,
  errorMessage,
  ...props
}) => {
  const confirmationCode = props.match.params.confirmationCode
  useEffect(() => {
    validateUser(confirmationCode);
  }, [validateUser, confirmationCode]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-evenly"
      minHeight={460}
      className={classes.mainContainer}
    >
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <>
          <Box className={classes.container}>
            <PageTitle title={"Something is wrong"} />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            className={classes.mainContainer}
          >
            <InfoText
              visible={true}
              error
              content={"User validation not possible"}
            />
            <InfoText visible={true} content={configs.help_text} />
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          className={classes.mainContainer}
        >
          <Box display="flex" flexDirection="column" className={classes.container}>
            <PageTitle title={"Account Verified. Welcome!"} />
            <Typography
              variant="caption"
            >
              <Link component={RouterLink} to="/login" variant="body2">
                {"Login"}
              </Link>
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      validateUser: registerActions.validateUser,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WelcomePage));
