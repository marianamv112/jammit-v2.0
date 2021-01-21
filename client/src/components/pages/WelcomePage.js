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
import { validateUser } from "../../redux/actions/registerActions";
import { bindActionCreators } from "redux";
import {
  help_text,
  mobile_viewport,
  tablet_viewport,
  desktop_viewport,
} from "../../config";
import { connect } from "react-redux";
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

const WelcomePage = ({
  classes,
  validateUser,
  loading,
  error,
  errorMessage,
  ...props
}) => {
  useEffect(() => {
    validateUser(props.match.params.confirmationCode);
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-evenly"
      minHeight={460}
    >
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <>
          <PageTitle
            title={"Something is wrong"}
          />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            className={classes.textFieldsContainer}
          >
            <InfoText
              visible={true}
              error
              content={"User validation not possible"}
            />
            <InfoText visible={true} content={help_text} />
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          style={{ width: "100%" }}
        >
          <PageTitle title={"Account Verified. Welcome!"} />
          <Typography variant="caption" className={classes.textFieldsContainer}>
            {"You can now successfully "}
            <Link component={RouterLink} to="/login" variant="body2">
              {"Login"}
            </Link>
          </Typography>
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
      validateUser,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WelcomePage));
