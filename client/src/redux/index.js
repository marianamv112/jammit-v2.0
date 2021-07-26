import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import thunk from "redux-thunk";
import createRootReducer from './reducers/rootReducer'


export const history = createBrowserHistory()

const store = createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(thunk, routerMiddleware(history)),
  )
);

export default store;
