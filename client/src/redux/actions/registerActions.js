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
          dispatch({ type: "SET_PENDING_USER", message: res.message });
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
          pendingUser: null,
        });
      })
      .catch((err) => {
        dispatch({ type: "SET_USER", currentUser: null });
        dispatch({
          loading: false,
          pendingUser: null,
          type: "SET_ERROR",
          error: true,
          message: err.response.data.message,
        });
      });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    logout()
      .then((response) => {
        dispatch({
          type: "SET_USER",
          currentUser: null,
          loading: false,
          pendingUser: null,
        });
      })
      .catch((err) => {
        dispatch({
          loading: false,
          pendingUser: null,
          type: "SET_ERROR",
          error: true,
          message: err.response.data.message,
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
