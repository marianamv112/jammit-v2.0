import update from "../../services/users";

export const updateUser = (username, fieldsToUpdate) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    update(username, fieldsToUpdate)
      .then((response) =>
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
        })
      )
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

export default { updateUser };
