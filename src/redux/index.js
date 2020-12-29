import {createStore} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import registerReducer from './reducers/registerReducer'


const store = createStore(
    registerReducer, composeWithDevTools(),
)

export default store;