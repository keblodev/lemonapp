import * as types from '../statics/constants/ActionTypes';

const appShellLevelTestAction = val => ({ type: types.APP_SHELL_ACTION, val });
const openAppShellMenuAction = () => ({ type: types.APP_SHELL_OPEN_MENU });
const closeAppShellMenuAction = () => ({ type: types.APP_SHELL_CLOSE_MENU });

export default {
	appShellLevelTestAction,
	openAppShellMenuAction,
	closeAppShellMenuAction
};
