import userServices from "../../services/users";
import { push } from 'connected-react-router'

export const updateUser = (userId, fieldsToUpdate) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    userServices.update(userId, fieldsToUpdate)
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
        })
      }

      ).then(() => {
        dispatch(push(`/profile/${userId}`))
      })
      .catch((err) => {
        dispatch({
          loading: false,
          type: "SET_ERROR",
          error: true,
          /* message: err.response.data.message, */
        });
      });
  };
};

export default updateUser;
