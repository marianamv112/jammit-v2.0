const defaultState = {
  currentUser: null,
  loading: false,
  error: null,
  errorMessage: null,
};

const setReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        loading: false,
        currentUser: {
          id: action.id,
          username: action.username,
          bio: action.bio,
          instruments: action.instruments,
          profilePicture: action.profilePicture,
          socialMedia: action.socialMedia,
        },
      };
    case "LOGOUT_USER":
      return {
        ...state,
        loading: false,
        currentUser: null
      };

    case "SET_PENDING_USER":
      return {
        ...state,
        loading: false,
        pendingUser: true,
        errorMessage: action.message,
      };
    case "NOT_LOADING":
      return {
        ...state,
        loading: false,
      };
    case "LOADING":
      return {
        ...state,
        /* currentUser: state.user.currentUser, */
        loading: true,
      };
    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        errorMessage: action.message,
      };

    default:
      return state;
  }
};

export default setReducer;
