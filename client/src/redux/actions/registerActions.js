import {
  verifyUser,
  login,
  signup,
  logout
} from "../../services/auth";

export const registerUser = (username, email, password) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    if (username && email && password) {
      signup(username, email, password)
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

export const validateUser = (code) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    verifyUser(code)
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

export const loginUser = (email, password) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    login(email, password)
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

export const logoutUser = () => {
  console.log("check")
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    logout()
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

export const cleanError = () => {
  return (dispatch) => {
    dispatch({ type: "SET_ERROR", error: false });
  };
};

export default {
  validateUser,
  loginUser,
  cleanError,
  registerUser,
  logoutUser,
};
