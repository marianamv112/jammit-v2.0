import authServices from "../../services/auth";

const registerUser = (username, email, password) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    if (username && email && password) {
      authServices.signup(username, email, password)
        .then((res) => {
          dispatch({ type: "NOT_LOADING" });
        })
        .catch((err) => {
          dispatch({ type: "NOT_LOADING" });
          dispatch({
            type: "SET_ERROR",
            error: true,
            message: err.response.data.message,
          });
        });
    }
  };
};

const validateUser = (code) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    authServices.verifyUser(code)
      .then((res) => {
        dispatch({
          type: "SET_ERROR",
          error: false,
          message: res.message,
        });
      })
      .catch((err) => {
        dispatch({
          type: "SET_ERROR",
          error: true,
          message: err.response.data.message,
        });
      });
  };
};

const loginUser = (email, password) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    authServices.login(email, password)
      .then((response) => {
        dispatch({
          type: "SET_USER",
          id: response._id,
          username: response.username,
          bio: response.bio,
          instruments: response.instruments,
          profilePicture: response.profilePicture,
          socialMedia: response.socialMedia,
          loading: false,
        });
      })
      .catch((err) => {
        dispatch({
          loading: false,
          type: "SET_ERROR",
          error: true,
          message: err.response.data.message,
        });
      });
  };
};

const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    authServices.logout()
      .then((response) => {
        dispatch({
          type: "LOGOUT_USER",
        });
      })
      .catch((err) => {
        dispatch({
          type: "SET_ERROR",
          error: true,
          message: err,
        });
      });
  };
};

const cleanError = () => {
  return (dispatch) => {
    dispatch({ type: "SET_ERROR", error: false });
  };
};

const registerActions = {
  validateUser,
  loginUser,
  cleanError,
  registerUser,
  logoutUser,
};

export default registerActions;
