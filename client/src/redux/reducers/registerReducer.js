const defaultState = {
  user: {
    currentUser: null,
    loading: false,
    error: null,
    errorMessage: null,
    pendingUser: null,
  },
};

const setReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: {
          loading: false,
          currentUser: { 
            id: action.id,
            username: action.username,
            bio: action.bio,
            instruments: action.instruments,
            profilePicture: action.profilePicture,
            socialMedia: action.socialMedia
          },
        },
      };
    case "SET_PENDING_USER":
      return {
        ...state,
        user: {
          loading: false,
          pendingUser: true,
          errorMessage: action.message,
        },
      };
    case "NOT_LOADING":
      return {
        ...state,
        user: {
          loading: false,
        },
      };
    case "LOADING":
      return {
        ...state,
        user: {
          loading: true,
        },
      };
    case "SET_ERROR":
      return {
        ...state,
        user: {
          loading: false,
          error: action.error,
          errorMessage: action.message,
        },
      };

    default:
      return state;
  }
};

export default setReducer;
