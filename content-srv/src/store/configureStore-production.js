import { createStore, compose, combineReducers, applyMiddleware  } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const localStorageKey = "myAwesoemThingProd";

export function configureStore(initialState) {
  return createStore(
		combineReducers({
			app: rootReducer,
			routing: routerReducer
		}),
		initialState,
		//this save the WHOLE state
		// which is somthing I might not need..
		// but on other hadn -> persisting complete alaytics state on client
		// is kinda big
		// but it brings whole lodash along the way +7kb gziped | 22 parsed
		// TODO: so maybe think of a spararce version of it later
		persistState(
			localStorageKey
		),
	    applyMiddleware(
			thunk,
			middleware)
  );
}
