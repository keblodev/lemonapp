import { AUTH_ACTION, NONE } from '../statics/constants/ActionTypes';

import { AppIds, AuthStates } from '../statics/constants/Auth';

const initialState = {
	authEvents: {
		ids: [],
		byId:  {}
	},
	authState: {
		...Object.keys( AppIds )
			.reduce((res,key) => ({...res,[key]:{}}),{})
	}
};

function byId(state = initialState.authEvents.byId, action, idToAdd = 0) {
	return {
		...state,
		[idToAdd] : action
	};
}

function ids(state = initialState.authEvents.ids, action, idToAdd = 0) {
	return [idToAdd, ...state];
}

function authEvents(state = initialState.authEvents, action) {
	let idToAdd = state.ids.length ? state.ids[0] + 1 : 0;

	return {
		byId:	byId(state.byId, action, idToAdd),
		ids:	ids(state.ids, action, idToAdd),
	};
}

function authState(state = initialState.authState, action) {
	return {
		...state,
		[action.appId]: {
			...state[action.appId],
			...action.event
		}
	}
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_ACTION:

      return {
		authEvents:	authEvents(state.authEvents, action),
		authState:	authState(state.authState, action.authEventObj)

      };

    default:
      return state;
  }
}