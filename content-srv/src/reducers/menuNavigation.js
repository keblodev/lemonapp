import { APP_SHELL_ACTION, APP_SHELL_OPEN_MENU, APP_SHELL_CLOSE_MENU, NONE } from '../statics/constants/ActionTypes';

const initialState = [{
	type: NONE,
	id: 0
}];

export default function menuNavigation(state = initialState, action) {
	switch (action.type) {
		case APP_SHELL_ACTION:
			return [{
				id: (state.length === 0) ? 0 : state[0].id + 1,
				type: APP_SHELL_ACTION,
			}, ...state];
		case APP_SHELL_OPEN_MENU:
		case APP_SHELL_CLOSE_MENU:
			return [{
				id: (state.length === 0) ? 0 : state[0].id + 1,
				type: action.type,
			}, ...state];
		default:
		return state;
	}
}