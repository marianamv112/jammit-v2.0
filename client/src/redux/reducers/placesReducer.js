/* import { defaultState } from "../defaultState"; */

const defaultState = {
    jamSessions: null
};

const setPlacesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_PLACES":
            return {
                ...state,
                jamSessions: action.places
            }
        default:
            return state;
    }

}

export default setPlacesReducer;