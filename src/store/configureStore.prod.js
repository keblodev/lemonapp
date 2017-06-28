import { createStore, compose, combineReducers, applyMiddleware  } from 'redux';
import rootReducer from '../reducers';

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

export function configureStore(initialState) {
  return createStore(
      combineReducers({
		    ...rootReducer,
		    routing: routerReducer
	    }),      
      initialState,     	
	    applyMiddleware(middleware)
  );
}
