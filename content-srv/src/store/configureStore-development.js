import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

import DevTools from '../containers/DevTools';

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const localStorageKey = "myAwesoemThingDev";

const enhancer = compose(
  DevTools.instrument(),
  //this save the WHOLE state
  // which is somthing I might not need..
  // but on other hadn -> persisting complete alaytics state on client
  // is kinda big
  persistState(
    localStorageKey
  )
);

export function configureStore(initialState) {
  const store = createStore(
      combineReducers({
		    app: rootReducer,
		    routing: routerReducer
	    }),
      initialState,
      enhancer,
	    applyMiddleware(thunk, middleware)
    );

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}
