import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import registerReducer from "./reducers/registerReducer";
import thunk from "redux-thunk";

//import rootReducer from './reducers/index';


const store = createStore(
  registerReducer,
  compose(
    applyMiddleware(thunk),
    composeWithDevTools()
  )
  
); //rootReducer

export default store;
