// reducers.js
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import registerReducer from './registerReducer';
import placesReducer from './placesReducer'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  user: registerReducer,
  places: placesReducer
})
export default createRootReducer