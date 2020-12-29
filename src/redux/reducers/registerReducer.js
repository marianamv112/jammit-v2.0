
const defaultState = {
  currentUser: {
    username: null,
    email: null,
    password: null,
  },
}

   const registerReducer = (state = defaultState, action) => { 
    switch (action.type) {
      case "REGISTER_USER": {
        return {
          ...state,
          currentUser: {
            username: action.username,
            email: action.email,
            password: action.password,
          },
        };
      }
      default:
          return state;
    }
  }


export default registerReducer;
